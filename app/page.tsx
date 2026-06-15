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
import { Reveal } from "@/components/anim/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="start" className="min-w-[320px] overflow-x-hidden">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal stagger>
          <WhyUs />
        </Reveal>
        <Reveal>
          <Offer />
        </Reveal>
        <Reveal stagger>
          <Process />
        </Reveal>
        <Reveal>
          <PricingInfo />
        </Reveal>
        <Reveal>
          <PricingPreview />
        </Reveal>
        <Reveal>
          <ServiceArea />
        </Reveal>
        <Reveal stagger>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
