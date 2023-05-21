import { useState, useEffect, useRef } from "react";
import SkillCell from "./SkillCell";
import data from "../../skilldata.json";
import SkillElement from "./SkillElement";
import useWindowSize from "./useWindowSize";
import useMousePosition from "./useMousePosition";

export type SkillT = {
  name: string;
  url: string;
  previousPosition?: { x: number; y: number } | undefined;
};

export default function Skills() {
  const [skills, setSkills] = useState(
    data.map((item) => {
      return { ...item } as SkillT;
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
      if (grabbedSkill) {
        setSkills((prev) => {
          return prev.map((item) => {
            if (item.name === grabbedSkill.name) {
              const position = {
                x: mousePos.x - cellPosOffset.x,
                y: mousePos.y - cellPosOffset.y,
              };
              return {
                ...item,
                previousPosition: {
                  x: mousePos.x - cellPosOffset.x,
                  y: mousePos.y - cellPosOffset.y,
                },
              };
            } else return item;
          });
        });
      }

      setGrabbedSkill(null);
    }
    window.addEventListener("mouseup", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("mouseup", release);
      window.removeEventListener("blur", release);
    };
  }, [grabbedSkill, mousePos, cellPosOffset]);
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
            x: e.clientX - target.getBoundingClientRect().x + 2,
            y: e.clientY - target.getBoundingClientRect().y + 2,
          });
        }}
        onHover={() => {
          if (grabbedSkill) {
            setSkills((prev) => {
              const newSkills = prev
                .filter((item) => item.name !== grabbedSkill.name)
                .map((item) => {
                  //find each item's current position (so that they can be transitioned later)
                  let position = undefined;
                  if (containerRef.current?.childNodes) {
                    containerRef.current.childNodes.forEach((child) => {
                      if (child.childNodes.length < 1) return;
                      const grandchild = child.childNodes[0] as HTMLElement;
                      if (grandchild.id === item.name) {
                        position = {
                          x: grandchild.getBoundingClientRect().x,
                          y: grandchild.getBoundingClientRect().y,
                        };
                      }
                    });
                  }

                  return { ...item, previousPosition: position };
                }) as Array<SkillT>;

              //insert the grabbed skill into the hovered cell
              newSkills.splice(i, 0, {
                ...grabbedSkill,
              });
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
            width: `${cellSize.x - 2}px`,
            height: `${cellSize.y - 2}px`,
            transform: `translateX(${
              mousePos.x - cellPosOffset.x
            }px) translateY(${mousePos.y - cellPosOffset.y}px)`,
          }}
        >
          <SkillElement skill={grabbedSkill} isGrabbed={true} />
        </div>
      )}

      <p className="text-h-s c-text-medium">
        &#8679;{" "}
        <a
          target="_blank"
          href="https://github.com/mannewdan/portfolio/tree/main/src/components/SkillsSection"
        >
          coded
        </a>{" "}
        by me
      </p>
    </section>
  );
}
