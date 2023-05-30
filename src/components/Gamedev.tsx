import Video from "./Video";

export default function Gamedev() {
  return (
    <section className="gamedev alt">
      <h2 className="text-h-m section-title">Other Works</h2>
      <p className="description text-b-s c-text-medium padded-container">
        A look at some of the things I've created in the Unity game engine
      </p>

      <div className="padded-container">
        <div className="grid">
          <Video url="gamedev/clouds.webm" />
          <Video url="gamedev/clouds.webm" />
          <Video url="gamedev/clouds.webm" />
          <Video url="gamedev/clouds.webm" />
          <Video url="gamedev/clouds.webm" />
          <Video url="gamedev/clouds.webm" />
        </div>
      </div>
    </section>
  );
}
