import Link from "next/link";
import { companyInfo } from "@/data/company";

export const metadata = {
  title: `Terms of Service | ${companyInfo.name}`,
  description: `Terms governing use of the ${companyInfo.name} website.`,
};

const updated = "2 September 2026";

export default function TermsPage() {
  return (
    <article className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <header className="mb-12 border-b border-border pb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Legal
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight text-secondary md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">Last updated: {updated}</p>
        </header>

        <div className="space-y-10 text-base leading-8 text-muted-foreground [&_h2]:text-2xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-secondary [&_li]:ml-5 [&_li]:list-disc">
          <p>
            These Terms of Service govern your use of the OceanNet Technologies
            website. By using the website, you agree to these terms. If you do
            not agree, please do not use it. Our website is informational and
            does not itself create a technology services contract, employment
            contract, partnership, or other commercial commitment.
          </p>

          <section>
            <h2>Website Use</h2>
            <p>
              You may use this website for lawful purposes, to learn about
              OceanNet, review our services and experience, contact us, or apply
              for opportunities. You must not misuse the website, interfere with
              its operation, attempt unauthorised access, introduce malicious
              code, scrape content in a way that burdens the service, or submit
              information that is unlawful, misleading, or belongs to someone
              else without permission.
            </p>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>
              Unless stated otherwise, the website, including its text, brand,
              logos, graphics, images, layout, and software, belongs to OceanNet
              or its licensors and is protected by applicable intellectual
              property laws. You may view and print reasonable extracts for
              personal, non-commercial reference. You may not reproduce, modify,
              distribute, publish, or commercially exploit material without our
              prior written permission.
            </p>
          </section>

          <section>
            <h2>Content and Availability</h2>
            <p>
              We aim to keep the website accurate and useful, but descriptions,
              project examples, service information, availability, and contact
              details may change. Content is provided for general information
              and is not professional, legal, financial, or technical advice. We
              do not guarantee that the website or any content will always be
              complete, current, uninterrupted, secure, or free from errors. We
              may change, suspend, or withdraw features without notice.
            </p>
          </section>

          <section>
            <h2>External Links</h2>
            <p>
              The website may link to third-party websites or services. Those
              sites are outside OceanNet’s control and are governed by their own
              terms and privacy notices. A link does not mean that OceanNet
              endorses or guarantees the third party, its content, or its
              availability.
            </p>
          </section>

          <section>
            <h2>Disclaimers and Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, OceanNet is not
              responsible for indirect, incidental, special, consequential, or
              business losses arising from use of, or inability to use, this
              website. Nothing in these terms excludes or limits liability that
              cannot lawfully be excluded or limited, including liability for
              fraud or other mandatory protections. Any services we provide are
              governed by a separate written agreement whose terms will control
              if they conflict with these website terms.
            </p>
          </section>

          <section>
            <h2>Changes and Contact</h2>
            <p>
              We may update these terms by publishing a revised version on this
              page. The “Last updated” date identifies the current version. For
              questions, contact{" "}
              <a
                className="font-semibold text-primary hover:underline"
                href={`mailto:${companyInfo.contacts.email}`}
              >
                {companyInfo.contacts.email}
              </a>
              or use our{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                href="/contact"
              >
                contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2>Governing Law</h2>
            <p>
              The governing law and courts for these terms must be confirmed by
              OceanNet’s legal advisers before publication. Until that review is
              complete, no jurisdiction wording on this page should be treated
              as final legal advice.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
