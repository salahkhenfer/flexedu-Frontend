import React from "react";
import NavBar from "./NavBar/NavBar";
import HeroSection from "../components/landingPageComp/HeroSection";
import {
  Achievement,
  Categories,
  Companies,
  Courses,
  CTA,
  FeedBack,
  Footer,
} from "../components/landingPageComp";
import ContactPage from "../components/landingPageComp/ContactPage";

function LandingPage() {
  return (
    <div className=" dark:bg-black dark:text-white scroll-smooth duration-500 scroll-d relative min-h-h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
      <NavBar />
      <HeroSection />
      <Courses />
      <Achievement />
      <Categories />
      <FeedBack />
      <ContactPage />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
