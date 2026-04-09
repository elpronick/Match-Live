import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Features from "../components/Features/Features";
import Benefits from "../components/Benefits/Benefits";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default Landing;