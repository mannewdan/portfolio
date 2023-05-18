import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <About />
        <Skills />

        <section style={{ height: "100rem" }}>
          <h1 className="text-h-l">Totam eius eos perspiciatis</h1>
          <h2 className="text-h-m">Totam eius eos perspiciatis</h2>
          <h3 className="text-h-s">Totam eius eos perspiciatis</h3>
          <p className="text-b-m">
            Nulla quis earum corrupti consectetur consectetur. Mollitia at vel
            dolorem aliquid sapiente incidunt. Ut exercitationem ad fugit. Iusto
            tenetur pariatur nisi architecto sint labore est voluptatem.
          </p>
          <p className="text-b-s">
            Nulla quis earum corrupti consectetur consectetur. Mollitia at vel
            dolorem aliquid sapiente incidunt. Ut exercitationem ad fugit. Iusto
            tenetur pariatur nisi architecto sint labore est voluptatem.
          </p>
        </section>
        <div style={{ height: "10rem" }}></div>
        <section style={{ height: "100rem" }}>
          <div id="projects" className="scroll-destination"></div>
          <p>Scroll To Here</p>
          <p>paragraph</p>
        </section>
      </main>
    </>
  );
}
