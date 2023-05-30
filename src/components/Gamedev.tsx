import Video from "./Video";

export default function Gamedev() {
  return (
    <section className="gamedev">
      <h2 className="text-h-m">Other Works</h2>
      <p className="description text-b-s c-text-medium">
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
