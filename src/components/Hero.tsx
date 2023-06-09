import Background from "./Background";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <Background />
      <div className="main-container">
        <h1 className="text-h-l uppercase greeting c-text-light">
          Hey! I'm Dan
        </h1>

        <a href="#projects" className="text-h-s">
          See my work
        </a>

        <Icon
          url="arrow.svg"
          className={navigator.maxTouchPoints > 0 ? "mobile" : ""}
        />
      </div>
    </section>
  );
}
