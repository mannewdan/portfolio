export default function Header() {
  return (
    <>
      <header className="header header-background">
        <span className="text-h-s">Daniel Newman</span>
        <nav>
          <a href="#home" className="text-b-m c-text-light-50">
            Home
          </a>
          <a href="#projects" className="text-b-m c-text-light-50">
            Projects
          </a>
          <a href="#contact" className="text-b-m c-text-light-50">
            Contact
          </a>
        </nav>
      </header>
      <div id="home" className="scroll-destination"></div>
    </>
  );
}
