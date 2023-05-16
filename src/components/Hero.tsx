import Background from "./Background";

export default function Hero() {
  return (
    <section className="hero">
      <Background />
      <div className="main-container">
        <h1 className="text-h-l uppercase greeting">Hey! I'm Dan</h1>
        <p className="text-h-m c-text-light-75 uppercase title">
          Frontend Developer
        </p>

        <a href="#projects" className="text-h-s">
          See my work
        </a>
      </div>
    </section>
  );
}
