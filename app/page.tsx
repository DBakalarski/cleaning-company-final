import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallButton } from "@/components/layout/MobileCallButton";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Offer } from "@/components/sections/Offer";
import { Process } from "@/components/sections/Process";
import { PricingInfo } from "@/components/sections/PricingInfo";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="start" className="min-w-[320px] overflow-x-hidden">
        <Hero />
        <About />
        <WhyUs />
        <Offer />
        <Process />
        <PricingInfo />
        <PricingPreview />
        <ServiceArea />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
