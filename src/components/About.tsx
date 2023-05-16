export default function About() {
  return (
    <section className="about">
      <div className="grid padded-container">
        <div className="text-container">
          <h2 className="text-h-m name">Daniel Newman</h2>
          <p className="text-h-s title">Frontend Developer</p>
          <p className="text-b-s description">
            {`I'm a self-taught frontend developer from the Twin Cities area and
            I'm excited to start my career in web development!`}
          </p>
        </div>
        <div className="image-container">
          <img src="pfp-grayer.png"></img>
        </div>
        <p className="text-b-s c-text-medium history">
          {`I became interested in web development in the Summer of 2022, and pursued my learning through scrimba.com and frontendmentor.io challenges, as well as a few personal projects. I have a background in programming & game art as a hobbyist of 10 years using C# and the Unity game engine.`}
        </p>
      </div>
    </section>
  );
}
