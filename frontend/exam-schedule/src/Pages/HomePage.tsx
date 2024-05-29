import { About } from "@/components/About";
import  Features  from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NavBarHome } from "@/components/NavBarHome.tsx";
import { ScrollToTop } from "@/components/ScrollToTop";
import "@/App.css";
import {Team} from "@/components/Team.tsx";

function HomePage() {

  return (
    <>
      <NavBarHome />
      <Hero />
      <About />
      <Features />
        <Team/>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default HomePage;
