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
  const [currentVideo, setCurrentVideo] = useState<VideoT | null>(null);

  return (
    <>
      <Header />
      <Hero />
      <main>
        <About />
        <Skills />
        <Projects />
        <Gamedev
          openGalleryView={setCurrentVideo}
          clearVideo={() => setCurrentVideo(null)}
        />
        <Contact />
        <GalleryView
          video={currentVideo}
          clearVideo={() => setCurrentVideo(null)}
        />
      </main>
    </>
  );
}
