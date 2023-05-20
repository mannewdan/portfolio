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
      <SkillElement
        skill={skill}
        isHidden={
          skill.name === grabbedSkill?.name && skill.url === grabbedSkill?.url
        }
      />
    </div>
  );
}
