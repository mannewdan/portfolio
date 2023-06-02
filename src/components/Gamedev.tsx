import { useState, useEffect } from "react";
import Video from "./Video";
import GalleryView from "./GalleryView";
import data from "../gamedevdata.json";
import useWindowSize from "./SkillsSection/useWindowSize";

export type VideoT = {
  id: number;
  label: string;
  url: string;
  isPlaying: boolean;
  lastClicked: boolean;
};

export default function Gamedev() {
  const [currentVideo, setCurrentVideo] = useState<VideoT | null>(null);
  const [videos, setVideos] = useState<Array<VideoT>>(
    data.map((item) => {
      return { ...item, isPlaying: false, lastClicked: false };
    })
  );
  const { isSmall } = useWindowSize();

  function pauseAll(exceptForThisID?: number) {
    setVideos((prev) => {
      return prev.map((item) => {
        if (item.id === exceptForThisID) {
          return item;
        } else return { ...item, isPlaying: false, lastClicked: false };
      });
    });
  }
  function toggleIsPlaying(id: number) {
    setVideos((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isPlaying: !item.isPlaying, lastClicked: true };
        } else return item;
      });
    });
  }

  useEffect(() => {
    pauseAll();
    if (!isSmall) {
      setCurrentVideo(null);
    }
  }, [isSmall]);

  //rendering
  const videoEls = videos.map((item) => {
    return (
      <Video
        key={item.id}
        video={item}
        onClick={() => {
          if (isSmall) {
            setCurrentVideo(item);
          } else {
            toggleIsPlaying(item.id);
            pauseAll(item.id);
          }
        }}
      />
    );
  });
  return (
    <>
      <section className="gamedev alt">
        <h2 className="text-h-m section-title">Other Works</h2>
        <p className="description text-b-s c-text-medium padded-container">
          A look at some other things I've done in my free time
        </p>

        <div className="padded-container">
          <div className="grid">{videoEls}</div>
        </div>
      </section>

      <GalleryView
        video={currentVideo}
        clearVideo={() => setCurrentVideo(null)}
      />
    </>
  );
}
