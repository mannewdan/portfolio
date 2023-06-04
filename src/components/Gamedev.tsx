import { useState, useEffect } from "react";
import Video from "./Video";
import GalleryView from "./GalleryView";
import data from "../gamedevdata.json";
import useWindowSize from "./SkillsSection/useWindowSize";

export type VideoT = {
  id: number;
  label: string;
  url: string;
  poster: string;
  isPlaying: boolean;
  lastClicked: boolean;
};

export default function Gamedev() {
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
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
  function setIsPlaying(id: number, isPlaying: boolean, lastClicked: boolean) {
    setVideos((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isPlaying, lastClicked };
        } else return { ...item, isPlaying: false, lastClicked: false };
      });
    });
  }
  function cycleCurrentVideo(direction: number) {
    setCurrentVideo((prev) => {
      if (prev === null) return 0;

      let newIndex;
      if (direction >= 0) {
        newIndex = prev + 1;
        if (newIndex > videos.length - 1) newIndex = 0;
      } else {
        newIndex = prev - 1;
        if (newIndex < 0) newIndex = videos.length - 1;
      }

      return newIndex;
    });
  }

  useEffect(() => {
    pauseAll();
    if (!isSmall) {
      setCurrentVideo(null);
    }
  }, [isSmall]);
  useEffect(() => {
    if (currentVideo !== null)
      setIsPlaying(videos[currentVideo].id, true, true);
  }, [currentVideo]);

  //rendering
  const videoEls = videos.map((item, index) => {
    return (
      <Video
        key={item.id}
        video={item}
        onClick={() => {
          if (isSmall) {
            toggleIsPlaying(item.id);
            setCurrentVideo(index);
          } else {
            toggleIsPlaying(item.id);
            pauseAll(item.id);
          }
        }}
        canPlay={!isSmall}
      />
    );
  });
  return (
    <>
      <section className="gamedev alt">
        <h2 className="text-h-m section-title">Other Works</h2>
        <p className="description text-b-s c-text-medium padded-container">
          A look at some other things I've done
        </p>

        <div className="padded-container">
          <div className="grid">{videoEls}</div>
        </div>
      </section>

      <GalleryView
        video={currentVideo !== null ? videos[currentVideo] : null}
        clearVideo={() => {
          pauseAll();
          setCurrentVideo(null);
        }}
        togglePlay={() => {
          if (currentVideo !== null) toggleIsPlaying(videos[currentVideo].id);
        }}
        onLeft={() => cycleCurrentVideo(-1)}
        onRight={() => cycleCurrentVideo(1)}
      />
    </>
  );
}
