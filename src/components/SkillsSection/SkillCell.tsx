import { useRef, useEffect } from "react";
import SkillElement from "./SkillElement";
import { SkillT } from "./Skills";

type SkillCellProps = {
  skill: SkillT;
  onClick: (e: React.MouseEvent) => void;
  onTap: (e: TouchEvent) => void;
  onHover: () => void;
  isHidden: boolean;
  isSelected: boolean;
};

export default function SkillCell({
  skill,
  onClick,
  onTap,
  onHover,
  isHidden,
  isSelected,
}: SkillCellProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  let isOffset = false;
  let xOffset = 0;
  let yOffset = 0;
  if (skill.previousPosition && containerRef && containerRef.current) {
    xOffset =
      skill.previousPosition.x - containerRef.current.getBoundingClientRect().x;
    yOffset =
      skill.previousPosition.y - containerRef.current.getBoundingClientRect().y;
    isOffset = true;
  }

  useEffect(() => {
    if (!containerRef.current) return;

    function handleTap(e: TouchEvent) {
      e.preventDefault();
      onTap(e);
    }
    containerRef.current.addEventListener("touchstart", handleTap, {
      passive: false,
    });
    return () => {
      if (!containerRef.current) return;
      containerRef.current.removeEventListener("touchstart", handleTap);
    };
  }, [onTap]);

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      onMouseEnter={onHover}
      className="skill-cell"
    >
      {/* Rerender is forced when isHidden changes so animation can play */}
      <SkillElement
        key={skill.name + " " + isHidden}
        skill={skill}
        isHidden={isHidden}
        isSelected={isSelected}
        startingOffset={isOffset ? { x: xOffset, y: yOffset } : undefined}
      />
    </div>
  );
}
