import { useState } from "react";
import Background from "./Background";

export default function Header() {
  const [active, setActive] = useState(false);

  return (
    <>
      <header className="header padded-container">
        <Background />
        <span className="text-h-s unselectable c-text-light">
          Daniel Newman
        </span>
        <div
          className={`nav-dropdown-button ${active ? "active" : ""}`}
          onClick={() => setActive((prev) => !prev)}
        >
          <button></button>
        </div>
        <nav className={active ? "active" : ""}>
          <a onClick={() => setActive(false)} href="#home" className="text-h-s">
            Home
          </a>
          <a
            onClick={() => setActive(false)}
            href="#projects"
            className="text-h-s"
          >
            Projects
          </a>
          <a
            onClick={() => setActive(false)}
            href="#contact"
            className="text-h-s"
          >
            Contact
          </a>
        </nav>
      </header>
    </>
  );
}
