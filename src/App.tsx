import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/SkillsSection/Skills";
import Projects from "./components/Projects";
import Gamedev from "./components/Gamedev";
import Contact from "./components/Contact";
import GalleryView from "./components/GalleryView";
import { useState } from "react";
import { VideoT } from "./components/Gamedev";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <About />
        <Skills />
        <Projects />
        <Gamedev />
        <Contact />
      </main>
    </>
  );
}
