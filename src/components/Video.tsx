import { useRef, useState } from "react";

type VideoProps = {
  url: string;
};

export default function Video({ url }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      onClick={() => {
        setIsPlaying((prev) => {
          const nowPlaying = !prev;
          if (nowPlaying) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }

          return nowPlaying;
        });
      }}
      ref={videoRef}
      controls={false}
      autoPlay={false}
      muted={true}
      loop={true}
    >
      <source type="video/webm" src={url}></source>
    </video>
  );
}
