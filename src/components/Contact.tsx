import Background from "./Background";
import Icon from "./Icon";

export default function Contact() {
  return (
    <footer className="contact">
      <div id="contact" className="scroll-destination"></div>
      <Background />
      <h2 className="text-h-m c-text-light section-title">Contact</h2>
      <div className="padded-container">
        <p className="c-text-light-75">
          {`Feel free to contact me on social media or shoot me an email at `}
          <strong className="c-text-light">{`mannewdan@outlook.com`}</strong>
        </p>
        <p className="c-text-light-75">{`I'm looking forward to hearing from you!`}</p>

        <a
          target="_blank"
          href="https://www.linkedin.com/in/daniel-newman-84459718b/"
        >
          <Icon url="logos/linkedin.svg" />
        </a>
      </div>
    </footer>
  );
}
