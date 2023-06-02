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

      {!playedOnce && (
        <div className="indicator play">
          <Icon url="play.svg" />
        </div>
      )}
      {playedOnce && video.lastClicked && video.isPlaying && (
        <div className="indicator play pulse-fade">
          <Icon url="play.svg" />
        </div>
      )}
      {playedOnce && video.lastClicked && !video.isPlaying && (
        <div className="indicator pause pulse-fade">
          <Icon url="pause.svg" />
        </div>
      )}
    </div>
  );
}
