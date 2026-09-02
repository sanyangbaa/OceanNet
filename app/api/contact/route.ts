import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAILS = (process.env.RESEND_TO_EMAILS || "info@ont-ltd.gm")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] || character,
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (
      !name ||
      !email ||
      !message ||
      name.length > 120 ||
      email.length > 320 ||
      message.length > 10000
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "—");
    const safeSubject = escapeHtml(subject || "Contact Form");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || "New Inquiry",
        message: phone ? `[Phone: ${phone}]\n\n${message}` : message,
        status: "new",
      },
    });

    // 2. Send notification email via Resend (only if key is set)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: `OceanNet Technologies <${FROM_EMAIL}>`,
          to: TO_EMAILS,
          replyTo: email,
          subject: `📩 New Enquiry: ${subject || "Contact Form"}`,
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding: 24px;">
              <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
                <div style="background:#e8c14a; padding:24px 32px;">
                  <h1 style="margin:0; color:#000; font-size:22px; font-weight:900; text-transform:uppercase; letter-spacing:2px;">
                    New Contact Form Submission
                  </h1>
                </div>
                <div style="padding:32px;">
                  <table style="width:100%; border-collapse:collapse;">
                    <tr><td style="padding:8px 0; color:#666; font-size:13px; width:120px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">Name</td><td style="padding:8px 0; color:#111; font-size:14px;">${safeName}</td></tr>
                    <tr><td style="padding:8px 0; color:#666; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">Email</td><td style="padding:8px 0; color:#111; font-size:14px;"><a href="mailto:${safeEmail}" style="color:#e8c14a;">${safeEmail}</a></td></tr>
                    <tr><td style="padding:8px 0; color:#666; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">Phone</td><td style="padding:8px 0; color:#111; font-size:14px;">${safePhone}</td></tr>
                    <tr><td style="padding:8px 0; color:#666; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">Subject</td><td style="padding:8px 0; color:#111; font-size:14px;">${safeSubject}</td></tr>
                  </table>
                  <div style="margin-top:24px; padding:20px; background:#f8f8f8; border-left:4px solid #e8c14a; border-radius:4px;">
                    <p style="margin:0; color:#666; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Message</p>
                    <p style="margin:0; color:#111; font-size:14px; line-height:1.6;">${safeMessage}</p>
                  </div>
                  <div style="margin-top:24px; text-align:center;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/contact" style="background:#e8c14a; color:#000; padding:12px 32px; border-radius:4px; text-decoration:none; font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:2px;">
                      View in Admin Panel →
                    </a>
                  </div>
                </div>
                <div style="padding:16px 32px; background:#f0f0f0; text-align:center;">
                  <p style="margin:0; color:#999; font-size:11px;">This email was sent from the ONT Website contact form.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        // Log but don't fail — message is safely in the database
        console.error(
          "[Resend] Failed to send notification email:",
          emailError,
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
