import { useRef, useState, useEffect } from "react";
import { VideoT } from "./Gamedev";
import Icon from "./Icon";

type VideoProps = {
  video: VideoT;
  onClick: () => void;
};

export default function Video({ video, onClick }: VideoProps) {
  const [playedOnce, setPlayedOnce] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video.isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [video.isPlaying]);

  return (
    <div className="video-container">
      <video
        onClick={() => {
          setPlayedOnce(true);
          onClick();
        }}
        ref={videoRef}
        controls={false}
        autoPlay={false}
        muted={true}
        loop={true}
      >
        <source type="video/webm" src={video.url}></source>
      </video>
      <p className="label text-h-s">{video.label}</p>

      <div
        className={`icon-container ${
          video.isPlaying ? "play" : video.lastClicked ? "pause" : ""
        } ${!playedOnce ? "force-show" : ""}`}
      >
        <div
          className="indicator play"
          style={{
            animationDelay:
              video.lastClicked && !video.isPlaying ? "350ms" : "0ms",
          }}
        >
          <Icon url="play.svg" />
        </div>
        <div className="indicator pause">
          <Icon url="pause.svg" />
        </div>
      </div>
    </div>
  );
}
