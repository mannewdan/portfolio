import Icon from "./Icon";

export default function About() {
  return (
    <section className="about">
      <div className="grid padded-container">
        {/* Main Text */}
        <div className="text-container">
          <h2 className="text-h-m name">Daniel Newman</h2>
          <p className="text-b-s description">
            {`A self-motivated developer from the Twin Cities area creating web and game apps.`}
          </p>
        </div>

        {/* Links */}
        <div className="links-container">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/daniel-newman-84459718b/"
          >
            <Icon url="logos/linkedin.svg" />
          </a>
          <a target="_blank" href="https://github.com/mannewdan">
            <Icon url="logos/github.svg" />
          </a>
        </div>

        {/* Image */}
        <div className="image-container">
          <div className="background"></div>
          <div className="small-circle"></div>
          <div className="large-circle"></div>
          <img src="pfp-grayer.png"></img>
        </div>

        {/* History */}
        <p className="text-b-s c-text-50 history">
          {`I became interested in web development in the Summer of 2022, and pursued my learning through `}
          <a
            target="_blank"
            href="https://scrimba.com/certificate/u7N4vxsz/gfrontend"
          >
            scrimba.com
          </a>
          {` and `}
          <a
            target="_blank"
            href="https://www.frontendmentor.io/profile/mannewdan"
          >
            frontendmentor.io challenges
          </a>
          {`, as well as a few personal projects. I have a background in programming & game art as a hobbyist of 10 years using C# and the Unity game engine.`}
        </p>
      </div>
    </section>
  );
}
