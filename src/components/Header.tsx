export default function Header() {
  return (
    <>
      <header className="header header-background">
        <span>Daniel Newman</span>
        <nav>
          <a href="#home" className="c-text-light-50">
            Home
          </a>
          <a href="#projects" className="c-text-light-50">
            Projects
          </a>
          <a href="#contact" className="c-text-light-50">
            Contact
          </a>
        </nav>
      </header>
      <div id="home" className="scroll-destination"></div>
    </>
  );
}
