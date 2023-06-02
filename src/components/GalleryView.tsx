import Video from "./Video";
import { VideoT } from "./Gamedev";
import { useEffect, useState } from "react";

type GalleryViewProps = {
  video: VideoT | null;
  clearVideo: () => void;
};

export default function GalleryView({ video, clearVideo }: GalleryViewProps) {
  useEffect(() => {
    if (video) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [video]);

  return (
    <div className="gallery-view">
      <div
        onClick={() => clearVideo()}
        className={`screen-fader ${!video ? "hidden" : ""}`}
      ></div>
      {video && <Video video={video} onClick={() => {}} />}
    </div>
  );
}
