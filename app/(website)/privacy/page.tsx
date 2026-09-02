import Link from "next/link";
import { companyInfo } from "@/data/company";

export const metadata = {
  title: `Privacy Policy | ${companyInfo.name}`,
  description: `How ${companyInfo.name} collects, uses, stores, and protects personal information.`,
};

const updated = "2 September 2026";

export default function PrivacyPage() {
  return (
    <article className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <header className="mb-12 border-b border-border pb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Legal
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight text-secondary md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground">Last updated: {updated}</p>
        </header>

        <div className="space-y-10 text-base leading-8 text-muted-foreground [&_h2]:text-2xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-secondary [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-secondary [&_li]:ml-5 [&_li]:list-disc">
          <p>
            OceanNet Technologies (“OceanNet”, “we”, “us”, or “our”) operates
            this website. We are a technology company based in The Gambia. For
            privacy questions or requests, contact us at{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href={`mailto:${companyInfo.contacts.email}`}
            >
              {companyInfo.contacts.email}
            </a>
            , call {companyInfo.contacts.phone}, or use our{" "}
            <Link
              className="font-semibold text-primary hover:underline"
              href="/contact"
            >
              contact page
            </Link>
            .
          </p>

          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information you choose to submit, including your name,
              email address, phone number, subject, and message through our
              contact form. Career applications may include your name, email,
              phone number, country, cover letter, and CV or resume. General
              talent-pool submissions may include your name, email, area of
              interest, and CV or resume.
            </p>
            <p className="mt-4">
              The website currently has no newsletter subscription form and does
              not collect newsletter data. If we introduce one, we will request
              a clear opt-in and update this policy before using the information
              for newsletters or marketing.
            </p>
          </section>

          <section>
            <h2>How We Use Information</h2>
            <p>We use submitted information to:</p>
            <ul className="mt-3 space-y-2">
              <li>respond to enquiries and provide requested information;</li>
              <li>
                process and assess job applications and talent-pool submissions;
              </li>
              <li>
                operate, secure, troubleshoot, and improve the website; and
              </li>
              <li>
                meet legal, regulatory, and legitimate business obligations.
              </li>
            </ul>
            <p className="mt-4">
              We rely on your request or consent when you submit a form, steps
              necessary to consider an application or respond to an enquiry,
              legitimate interests in operating our business and website, and
              legal obligations where applicable. We do not use applicant or
              enquiry data for unrelated marketing without an appropriate
              consent or other lawful basis.
            </p>
          </section>

          <section>
            <h2>Cookies, Logs, and Analytics</h2>
            <p>
              We do not currently run a third-party advertising or analytics
              script on the public website. The hosting platform and web server
              may create standard technical logs such as IP address, request
              time, browser, device, and error information for security,
              availability, and diagnostics. The administrative area may use a
              strictly necessary authentication cookie. We do not use cookies
              for behavioural advertising.
            </p>
          </section>

          <section>
            <h2>Service Providers and Transfers</h2>
            <p>
              Depending on the deployment and configuration, OceanNet uses the
              following service providers: Netlify or Vercel for hosting and
              deployment; a PostgreSQL or MySQL provider configured through
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm text-secondary">
                DATABASE_URL
              </code>
              for application data; Resend for contact-enquiry notification
              email; and Supabase Storage or Cloudflare R2 for production file
              storage. Local development may use local file storage. These
              providers process information only as needed to provide their
              services and may process it outside The Gambia. We use
              contractual, organisational, and technical safeguards appropriate
              to the service and applicable requirements.
            </p>
          </section>

          <section>
            <h2>Retention</h2>
            <p>
              We retain enquiries only for as long as needed to respond, manage
              the relationship, maintain business records, and resolve disputes.
              We retain recruitment records and CVs only for as long as needed
              to assess an application, administer recruitment, consider future
              opportunities where permitted, and meet legal obligations. We aim
              to review unsuccessful applicant records within 12 months and
              delete or anonymise them sooner when no longer needed, unless a
              longer period is required or agreed. We may retain an audit record
              of deletion or consent withdrawal.
            </p>
          </section>

          <section>
            <h2>Security</h2>
            <p>
              We use access controls, authenticated administration, encrypted
              connections where supported, restricted server credentials, and
              provider security controls. No internet transmission or storage
              system is completely secure, so we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2>Your Rights and Requests</h2>
            <p>
              Subject to applicable law, you may ask us to access, correct,
              update, delete, or restrict use of your personal information, or
              object to a use based on legitimate interests. You may withdraw
              consent where processing relies on consent. Send requests to{" "}
              <a
                className="font-semibold text-primary hover:underline"
                href={`mailto:${companyInfo.contacts.email}`}
              >
                {companyInfo.contacts.email}
              </a>
              . We may need to verify your identity and may retain information
              where the law permits or requires it.
            </p>
          </section>

          <section>
            <h2>Updates and Legal Review</h2>
            <p>
              We may update this policy when our services, providers, or legal
              obligations change. The date above shows when it was last updated.
              This policy is written for OceanNet’s current implementation and
              must be reviewed against applicable Gambian law and our final
              provider agreements before publication as a legal notice.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
