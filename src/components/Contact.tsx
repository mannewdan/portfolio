import Background from "./Background";

export default function Contact() {
  return (
    <footer className="contact">
      <Background />
      <h2 className="text-h-m c-text-light section-title">Contact</h2>
      <div className="padded-container">
        <p className="c-text-light-75">
          {`Feel free to contact me on social media or shoot me an email at `}
          <strong className="c-text-light">{`mannewdan@outlook.com`}</strong>
        </p>
        <p className="c-text-light-75">{`I'm looking forward to hearing from you!`}</p>
      </div>
    </footer>
  );
}
