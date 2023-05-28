import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/SkillsSection/Skills";
import Projects from "./components/Projects";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <About />
        <Skills />
        <Projects />
      </main>
    </>
  );
}
