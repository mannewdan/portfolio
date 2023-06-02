import Video from "./Video";
import { VideoT } from "./Gamedev";
import { useEffect, useState } from "react";
import Icon from "./Icon";

type GalleryViewProps = {
  video: VideoT | null;
  clearVideo: () => void;
  togglePlay: () => void;
  onLeft: () => void;
  onRight: () => void;
};

export default function GalleryView({
  video,
  clearVideo,
  togglePlay,
  onLeft,
  onRight,
}: GalleryViewProps) {
  const [disableAnimation, setDisableAnimation] = useState(true);
  const [currentID, setCurrentID] = useState(video?.id);

  useEffect(() => {
    if (video) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [video]);

  useEffect(() => {
    setDisableAnimation(true);
    setCurrentID(video?.id);
  }, [video?.id]);
  useEffect(() => {
    if (currentID === video?.id && !video?.isPlaying) {
      setDisableAnimation(false);
    }
  }, [video?.isPlaying]);

  return (
    <div
      className={`gallery-view ${disableAnimation ? "disable-animation" : ""}`}
    >
      <div
        onClick={() => clearVideo()}
        className={`screen-fader ${!video ? "hidden" : ""}`}
      ></div>
      {video && (
        <Video
          video={video}
          onClick={() => togglePlay()}
          closeable={true}
          onClose={() => clearVideo()}
          cycleable={true}
          onLeft={onLeft}
          onRight={onRight}
        />
      )}
    </div>
  );
}
