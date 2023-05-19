import { useState, useEffect, useRef } from "react";
import SkillElement from "./SkillElement";
import data from "../skilldata.json";

export type SkillT = {
  name: string;
  url: string;
  startIndex: number;
  currentIndex: number;
};

export default function Skills() {
  const [skills, setSkills] = useState(
    data.map((item, index) => {
      return { ...item, startIndex: index, currentIndex: index };
    })
  );
  const [grabbedSkill, setGrabbedSkill] = useState<SkillT | null>(null);
  const [mouseOnGrab, setMouseOnGrab] = useState({ x: 0, y: 0 });
  const [mouseNow, setMouseNow] = useState({ x: 0, y: 0 });
  const [xSpacing, setXSpacing] = useState(0);
  const [ySpacing, setYSpacing] = useState(0);
  const [columnCount, setColumnCount] = useState(3);
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });
  const [hoveredCell, setHoveredCell] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      containerRef &&
      containerRef.current &&
      containerRef.current.childNodes.length < 1
    ) {
      return;
    }

    const div0 = containerRef.current?.childNodes[0]
      .childNodes[0] as HTMLDivElement;
    const gapSize = parseInt(
      window
        .getComputedStyle(containerRef.current as Element)
        .getPropertyValue("gap")
    );

    setXSpacing(div0.getBoundingClientRect().width + gapSize);
    setYSpacing(div0.getBoundingClientRect().height + gapSize);
    setColumnCount(
      parseInt(
        window
          .getComputedStyle(containerRef.current as Element)
          .getPropertyValue("--column-count")
      )
    );
  }, [containerRef, windowSize]);

  //click/drag/resize events
  useEffect(() => {
    const resize = () => {
      setWindowSize({ x: window.innerWidth, y: window.innerHeight });
    };
    const release = () => {
      setGrabbedSkill(null);
    };
    const down = (e: MouseEvent) => {
      setMouseOnGrab({ x: e.clientX, y: e.clientY });
    };
    const downTouch = (e: TouchEvent) => {
      e.preventDefault();
      setMouseOnGrab({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
      setMouseNow({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    };
    const move = (e: MouseEvent) => {
      setMouseNow({ x: e.clientX, y: e.clientY });
    };
    const moveTouch = (e: TouchEvent) => {
      e.preventDefault();
      setMouseNow({
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      });
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mouseup", release);
    window.addEventListener("blur", release);
    window.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    if (containerRef?.current) {
      containerRef.current.addEventListener("touchstart", downTouch, {
        passive: false,
      });
      containerRef.current.addEventListener("touchmove", moveTouch, {
        passive: false,
      });
      containerRef.current.addEventListener("touchend", release, {
        passive: false,
      });
      containerRef.current.addEventListener("touchcancel", release, {
        passive: false,
      });
    }
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mouseup", release);
      window.removeEventListener("blur", release);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      if (containerRef?.current) {
        containerRef.current.removeEventListener("touchstart", downTouch);
        containerRef.current.removeEventListener("touchmove", moveTouch);
        containerRef.current.removeEventListener("touchend", release);
        containerRef.current.removeEventListener("touchcancel", release);
      }
    };
  }, [containerRef]);
  useEffect(() => {
    if (grabbedSkill !== null) {
      document.body.classList.add("grabbing");
    } else {
      document.body.classList.remove("grabbing");
    }
  }, [grabbedSkill]);

  return (
    <section className="skills">
      <h2 className="text-h-m">Skills</h2>

      <div className="padded-container">
        <div ref={containerRef} className="grid">
          {skills.map((item, index) => (
            <SkillElement
              key={item.name}
              skill={item}
              grabbedSkill={grabbedSkill}
              setGrabbedSkill={setGrabbedSkill}
              mouseOnGrab={mouseOnGrab}
              mouseNow={mouseNow}
              xSpacing={xSpacing}
              ySpacing={ySpacing}
              columnCount={columnCount}
              onHover={() => {
                setHoveredCell(index);

                //set skills
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
