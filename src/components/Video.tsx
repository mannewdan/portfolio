import { useRef, useState, useEffect } from "react";
import { VideoT } from "./Gamedev";
import Icon from "./Icon";

type VideoProps = {
  video: VideoT;
  onClick: () => void;
  closeable?: boolean;
  onClose?: () => void;
  cycleable?: boolean;
  onLeft?: () => void;
  onRight?: () => void;
  canPlay?: boolean;
};

export default function Video({
  video,
  onClick,
  closeable = false,
  onClose = () => {},
  cycleable = false,
  onLeft = () => {},
  onRight = () => {},
  canPlay = true,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (canPlay && video.isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [video.isPlaying]);

  return (
    <div className="video-container">
      <video
        key={video.url}
        onClick={() => {
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
          canPlay && video.isPlaying
            ? "play"
            : canPlay && video.lastClicked
            ? "pause"
            : ""
        }`}
      >
        {/* Play Indicator */}
        <div
          className="indicator play"
          style={{
            animationDelay:
              video.lastClicked && !video.isPlaying ? "350ms" : "0ms",
          }}
        >
          <Icon url="play.svg" />
        </div>

        {/* Pause Indicator */}
        <div className="indicator pause">
          <Icon url="pause.svg" />
        </div>
      </div>

      {/* X Button */}
      {closeable && (
        <div onClick={() => onClose()} className="close-x">
          <Icon url="x.svg" />
        </div>
      )}

      {/* Arrow Buttons */}
      {cycleable && (
        <>
          <div onClick={() => onLeft()} className="arrow left">
            <Icon url="arrow.svg" />
          </div>
          <div onClick={() => onRight()} className="arrow right">
            <Icon url="arrow.svg" />
          </div>
        </>
      )}
    </div>
  );
}
