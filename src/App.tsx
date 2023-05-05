import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <h1 className="text-h-l">Totam eius eos perspiciatis</h1>
      <h2 className="text-h-m">Totam eius eos perspiciatis</h2>
      <h3 className="text-h-s">Totam eius eos perspiciatis</h3>
      <p className="text-b-m">
        Nulla quis earum corrupti consectetur consectetur. Mollitia at vel
        dolorem aliquid sapiente incidunt. Ut exercitationem ad fugit. Iusto
        tenetur pariatur nisi architecto sint labore est voluptatem.
      </p>
      <p className="text-b-s" style={{ height: "200vh" }}>
        Nulla quis earum corrupti consectetur consectetur. Mollitia at vel
        dolorem aliquid sapiente incidunt. Ut exercitationem ad fugit. Iusto
        tenetur pariatur nisi architecto sint labore est voluptatem.
      </p>
      <div id="projects" className="scroll-destination"></div>
      <p>Scroll To Here</p>
      <p style={{ height: "200vh" }}>paragraph</p>
    </>
  );
}
