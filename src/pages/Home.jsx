import { useReveal } from "../hooks/useReveal.js";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import Portfolio from "../components/Portfolio.jsx";
import ChannelBanner from "../components/ChannelBanner.jsx";
import Process from "../components/Process.jsx";
import Reviews from "../components/Reviews.jsx";
import QuoteSection from "../components/QuoteSection.jsx";

export default function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <About />
      <Services />
      <BeforeAfter />
      <Portfolio />
      <ChannelBanner />
      <Process />
      <Reviews />
      <QuoteSection />
    </>
  );
}
