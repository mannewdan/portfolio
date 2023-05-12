import Background from "./Background";

export default function Header() {
  return (
    <>
      <header className="header">
        <Background />
        <span className="text-h-s">Daniel Newman</span>
        <nav>
          <a href="#home" className="text-h-s c-text-light-50">
            Home
          </a>
          <a href="#projects" className="text-h-s c-text-light-50">
            Projects
          </a>
          <a href="#contact" className="text-h-s c-text-light-50">
            Contact
          </a>
        </nav>
      </header>
      <div id="home" className="scroll-destination"></div>
    </>
  );
}
