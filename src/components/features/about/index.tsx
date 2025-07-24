import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import OurMission from "./OurMission";
import OurValues from "./OurValues";
import OurVision from "./OurVision";
import ShippingAndReturns from "./ShippingAndReturns";
import WhatWeOffer from "./WhatWeOffer";
import WhoWeAre from "./WhoWeAre";

const About = () => {
  return (
    <div className="bg-light-gray">
      <HeroSection />
      <div className="flex flex-col gap-5 lg:gap-8 xl:gap-10">
        <WhoWeAre />
        <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <OurVision />
          <OurMission />
        </div>
        <OurValues />
        <WhatWeOffer />
        {/* <OurTeam /> */}
        <ShippingAndReturns />
        <ContactSection />
      </div>
    </div>
  );
};

export default About;
