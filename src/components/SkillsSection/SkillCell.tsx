import { useRef } from "react";
import SkillElement from "./SkillElement";
import { SkillT } from "./Skills";

type SkillCellProps = {
  index: number;
  skill: SkillT;
  onGrab: (e: React.MouseEvent) => void;
  onHover: () => void;
  grabbedSkill: SkillT | null;
  setCellPosOffset: (offset: { x: number; y: number }) => void;
};

export default function SkillCell({
  index,
  skill,
  onGrab,
  onHover,
  grabbedSkill,
  setCellPosOffset,
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

  const isHidden =
    skill.name === grabbedSkill?.name && skill.url === grabbedSkill?.url;

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        e.preventDefault();
        onGrab(e);
      }}
      onMouseEnter={onHover}
      className="skill-cell"
    >
      {/* Rerender is forced when isHidden changes so animation can play */}
      <SkillElement
        key={skill.name + " " + isHidden}
        skill={skill}
        isHidden={isHidden}
        startingOffset={isOffset ? { x: xOffset, y: yOffset } : undefined}
      />
    </div>
  );
}
