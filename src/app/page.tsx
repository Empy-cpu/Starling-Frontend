import HeroSection from "@/Components/Home/HeroSection/HeroSection";
import ServicesSection from "@/Components/Home/ServicesSection/ServicesSection";
import HowItWorksSection from "@/Components/Home/HowItWorksSection/HowItWorksSection";
import WhyChooseUsSection from "@/Components/Home/WhyChooseUsSection/WhyChooseUsSection";
import ContactUsSection from "@/Components/Home/ContactUsSection/ContactUsSection";
import JobsSection from "@/Components/Home/JobsSection/JobsSection";
import FinalCTASection from "@/Components/Home/FinalCTASection/FinalCTASection";
import './page.module.css';


export default function HomePage() {
  return (
    <div className="homepage">
      <HeroSection />
      <ServicesSection/>
      <HowItWorksSection/>
      <WhyChooseUsSection/>    
      <ContactUsSection />
      <JobsSection />
      <FinalCTASection />
    </div>
  )
}
