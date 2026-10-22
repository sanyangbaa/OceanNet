import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Partners } from "@/components/sections/partners";
import { Testimonials } from "@/components/sections/testimonials";
import { CallToAction } from "@/components/sections/cta";
import { getMergedCompanyInfo } from "@/lib/data";
import {
  SectionCardsSkeleton,
  TestimonialsSkeleton,
} from "@/components/shared/section-skeleton";

/**
 * ISR: revalidate cached page every 60 seconds in the background.
 * This makes the first load instant (served from cache) while content
 * stays fresh. Remove this and use `force-dynamic` only if you need
 * real-time data on every single request.
 */
export const revalidate = 60;

export default async function HomePage() {
  // Reuses the request-cached company info already fetched by WebsiteLayout
  const companyInfo = await getMergedCompanyInfo();

  return (
    <>
      {/* Hero is static/client — renders immediately */}
      <Hero />

      {/* AboutPreview receives cached phone — renders instantly without skeleton flash */}
      <AboutPreview phone={companyInfo.contacts.phone} />

      {/* ServicesOverview reads static data — no Suspense needed */}
      <div id="services">
        <ServicesOverview />
      </div>

      {/* WhyChooseUs is fully static/client */}
      <WhyChooseUs />

      {/* Partners fetches from DB — streams in via client useEffect anyway */}
      <Partners />

      {/* FeaturedProjects hits DB — stream it in */}
      <Suspense fallback={<SectionCardsSkeleton count={6} />}>
        <FeaturedProjects />
      </Suspense>

      {/* Testimonials hits DB — stream it in */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials featuredOnly />
      </Suspense>

      {/* CTA is static */}
      <CallToAction />
    </>
  );
}
