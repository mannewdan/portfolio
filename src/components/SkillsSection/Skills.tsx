import { useState, useEffect, useRef } from "react";
import SkillCell from "./SkillCell";
import data from "../../skilldata.json";
import SkillElement from "./SkillElement";
import useWindowSize from "./useWindowSize";
import useMousePosition from "./useMousePosition";

export type SkillT = {
  name: string;
  url: string;
  image: HTMLImageElement;
  previousPosition?: { x: number; y: number } | undefined;
};

export default function Skills() {
  const [skills, setSkills] = useState(
    data.map((item) => {
      const newItem = { ...item, image: new Image() } as SkillT;
      newItem.image.src = item.url;
      return newItem;
    })
  );
  const [grabbedSkill, setGrabbedSkill] = useState<SkillT | null>(null);
  const [touchMode, setTouchMode] = useState(false);
  const [cellSize, setCellSize] = useState({ x: 0, y: 0 });
  const [columns, setColumns] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { windowSize } = useWindowSize();
  const [mousePos] = useMousePosition();
  const [cellPosOffset, setCellPosOffset] = useState({ x: 0, y: 0 });
  const [attentionGrabber, setAttentionGrabber] = useState(true);

  //useEffects
  useEffect(() => {
    //clear grabbed skill on release/blur
    function handlePointer(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      release();
    }
    function handleTouchEnd(e: TouchEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains("skill-cell")) return;
      release();
    }
    function release() {
      if (grabbedSkill) {
        setSkills((prev) => {
          return prev.map((item) => {
            if (item.name === grabbedSkill.name) {
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
    window.addEventListener("pointerup", handlePointer);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("pointerup", handlePointer);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("blur", release);
    };
  }, [grabbedSkill, mousePos, cellPosOffset]);
  useEffect(() => {
    if (grabbedSkill !== null) setAttentionGrabber(false);

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

    //recalculate cell size & obtain column count
    const cell = containerRef.current.childNodes[0] as HTMLDivElement;
    setCellSize({
      x: cell.getBoundingClientRect().width,
      y: cell.getBoundingClientRect().height,
    });
    setColumns(
      parseInt(
        window
          .getComputedStyle(containerRef.current as Element)
          .getPropertyValue("--column-count")
      )
    );
  }, [containerRef, windowSize]);

  //functions
  function moveSkill(skill: SkillT, i: number) {
    setSkills((prev) => {
      let indexOfGrabbed = -1;
      let newSkills = prev.map((item, index) => {
        if (item.name === skill.name) indexOfGrabbed = index;

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

        if (item.name === skill.name) {
          indexOfGrabbed = index;
          skill.previousPosition = position;
        }

        return { ...item, previousPosition: position };
      }) as Array<SkillT>;

      if (
        indexOfGrabbed >= 0 &&
        Math.floor(indexOfGrabbed / columns) !== Math.floor(i / columns)
      ) {
        //for different rows, swap the grabbed element with the element in the hovered cell
        const hoveredElement = newSkills[i];
        newSkills[i] = { ...skill };
        newSkills[indexOfGrabbed] = { ...hoveredElement };
      } else {
        //for same row, remove grabbed element and then insert it into the hovered cell
        newSkills = newSkills.filter((item) => item.name !== skill.name);
        newSkills.splice(i, 0, {
          ...skill,
        });
      }

      return newSkills;
    });
  }

  //rendering
  const cellEls = [];
  for (let i = 0; i < skills.length; i++) {
    cellEls.push(
      <SkillCell
        key={i}
        skill={skills[i]}
        onClick={(e: React.MouseEvent) => {
          setGrabbedSkill(skills[i]);
          setTouchMode(false);

          const target = e.target as HTMLElement;
          setCellPosOffset({
            x: e.clientX - target.getBoundingClientRect().x,
            y: e.clientY - target.getBoundingClientRect().y,
          });
        }}
        onHover={() => {
          if (!grabbedSkill) return;

          moveSkill(grabbedSkill, i);
        }}
        onTap={(e: React.TouchEvent) => {
          setTouchMode(true);

          if (grabbedSkill) {
            if (grabbedSkill.name === skills[i].name) {
              setGrabbedSkill(null);
            } else {
              moveSkill(grabbedSkill, i);
              setGrabbedSkill(null);
            }
          } else {
            setGrabbedSkill(skills[i]);
            const target = e.target as HTMLElement;
            setCellPosOffset({
              x: e.changedTouches[0].clientX - target.getBoundingClientRect().x,
              y: e.changedTouches[0].clientY - target.getBoundingClientRect().y,
            });
          }
        }}
        isHidden={
          !touchMode &&
          grabbedSkill !== null &&
          grabbedSkill.name === skills[i].name
        }
        isSelected={
          touchMode &&
          grabbedSkill !== null &&
          grabbedSkill.name === skills[i].name
        }
        grabAttention={attentionGrabber && i === 0}
      />
    );
  }
  return (
    <section className="skills alt">
      <h2 className="text-h-m section-title">Skills</h2>

      <div className="padded-container">
        <div ref={containerRef} className="grid">
          {cellEls}
        </div>
      </div>

      {/* Grabbed Skill */}
      {grabbedSkill && !touchMode && (
        <div
          className="grabbed-skill"
          style={{
            width: `${cellSize.x - 2}px`,
            height: `${cellSize.y - 2}px`,
            transform: touchMode
              ? ""
              : `translateX(${mousePos.x - cellPosOffset.x}px) translateY(${
                  mousePos.y - cellPosOffset.y
                }px)`,
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
