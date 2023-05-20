import { useState, useEffect, useRef } from "react";
import SkillCell from "./SkillCell";
import data from "../../skilldata.json";
import SkillElement from "./SkillElement";
import useWindowSize from "./useWindowSize";
import useMousePosition from "./useMousePosition";

export type SkillT = {
  name: string;
  url: string;
};

export default function Skills() {
  const [skills, setSkills] = useState(
    data.map((item) => {
      return { ...item };
    })
  );
  const [grabbedSkill, setGrabbedSkill] = useState<SkillT | null>(null);
  const [hoveredCell, setHoveredCell] = useState(0);
  const [cellSize, setCellSize] = useState({ x: 0, y: 0 });
  const [gapSize, setGapSize] = useState(0);
  const [columns, setColumns] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize] = useWindowSize();
  const [mousePos] = useMousePosition();
  const [cellPosOffset, setCellPosOffset] = useState({ x: 0, y: 0 });

  //useEffects
  useEffect(() => {
    //clear grabbed skill on release/blur
    function release() {
      setGrabbedSkill(null);
    }
    window.addEventListener("mouseup", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("mouseup", release);
      window.removeEventListener("blur", release);
    };
  }, []);
  useEffect(() => {
    //change cursor to 'grabbing' while grabbing a skill
    if (grabbedSkill !== null) {
      document.body.classList.add("grabbing");
    } else {
      document.body.classList.remove("grabbing");
    }
  }, [grabbedSkill]);
  useEffect(() => {
    if (
      !containerRef ||
      !containerRef.current ||
      containerRef.current.childNodes.length < 1
    ) {
      return;
    }

    //recalculate cell size
    const cell = containerRef.current.childNodes[0] as HTMLDivElement;
    setCellSize({
      x: cell.getBoundingClientRect().width,
      y: cell.getBoundingClientRect().height,
    });
  }, [containerRef, windowSize]);

  //rendering
  const cellEls = [];
  for (let i = 0; i < skills.length; i++) {
    cellEls.push(
      <SkillCell
        key={i}
        index={i}
        skill={skills[i]}
        onGrab={(e: React.MouseEvent) => {
          setGrabbedSkill(skills[i]);

          const target = e.target as HTMLElement;
          setCellPosOffset({
            x: e.clientX - target.getBoundingClientRect().x,
            y: e.clientY - target.getBoundingClientRect().y,
          });
        }}
        onHover={() => {
          if (grabbedSkill) {
            setSkills((prev) => {
              const newSkills = prev.filter(
                (item) => item.name !== grabbedSkill.name
              );
              newSkills.splice(i, 0, grabbedSkill);
              return newSkills;
            });
          }
        }}
        grabbedSkill={grabbedSkill}
        setCellPosOffset={setCellPosOffset}
      />
    );
  }
  return (
    <section className="skills">
      <h2 className="text-h-m">Skills</h2>

      <div className="padded-container">
        <div ref={containerRef} className="grid">
          {cellEls}
        </div>
      </div>

      {/* Grabbed Skill */}
      {grabbedSkill && (
        <div
          className="grabbed-skill"
          style={{
            width: `${cellSize.x}px`,
            height: `${cellSize.y}px`,
            transform: `translateX(${
              mousePos.x - cellPosOffset.x
            }px) translateY(${mousePos.y - cellPosOffset.y}px)`,
          }}
        >
          <SkillElement skill={grabbedSkill} isGrabbed={true} />
        </div>
      )}
    </section>
  );
}
