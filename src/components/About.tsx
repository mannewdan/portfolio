export default function About() {
  return (
    <section className="about">
      <div className="grid padded-container">
        {/* Main Text */}
        <div className="text-container">
          <h2 className="text-h-m name">Daniel Newman</h2>
          <p className="text-h-s title">Frontend Developer</p>
          <p className="text-b-s description">
            {`I'm a self-taught frontend developer from the Twin Cities area and
            I'm excited to start my career in web development!`}
          </p>
        </div>

        {/* Image */}
        <div className="image-container">
          <div className="background"></div>
          <div className="small-circle"></div>
          <div className="large-circle"></div>
          <img src="pfp-grayer.png"></img>
        </div>

        {/* History */}
        <p className="text-b-s c-text-medium history">
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
