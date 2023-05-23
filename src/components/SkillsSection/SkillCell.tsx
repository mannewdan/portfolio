import { useState, useRef, useEffect } from "react";
import SkillElement from "./SkillElement";
import { SkillT } from "./Skills";

type SkillCellProps = {
  skill: SkillT;
  onClick: (e: React.MouseEvent) => void;
  onTap: (e: React.TouchEvent) => void;
  onHover: () => void;
  isHidden: boolean;
  isSelected: boolean;
  grabAttention: boolean;
};

const timeThreshold = 400;
const distanceThreshold = 35;

export default function SkillCell({
  skill,
  onClick,
  onTap,
  onHover,
  isHidden,
  isSelected,
  grabAttention,
}: SkillCellProps) {
  const [isAttentionGrabberCell] = useState(grabAttention);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 });

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

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") {
          return;
        }
        e.preventDefault();
        onClick(e);
      }}
      onMouseEnter={onHover}
      onTouchStart={(e) => {
        setTouchStartTime(Date.now());
        setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }}
      onTouchEnd={(e: React.TouchEvent) => {
        const deltaTime = Date.now() - touchStartTime;
        const deltaPos = Math.abs(
          e.changedTouches[0].clientX -
            touchStartPos.x +
            e.changedTouches[0].clientY -
            touchStartPos.y
        );

        if (deltaTime <= timeThreshold && deltaPos <= distanceThreshold) {
          onTap(e);
        }
      }}
      className={`skill-cell ${grabAttention ? "attention-grabber" : ""}`}
    >
      {/* Rerender is forced when isHidden changes so animation can play */}
      <SkillElement
        key={skill.name + " " + isHidden}
        skill={skill}
        isHidden={isHidden}
        isSelected={isSelected}
        startingOffset={isOffset ? { x: xOffset, y: yOffset } : undefined}
      />

      {isAttentionGrabberCell && (
        <div
          className={`attention-grabber text-h-m ${
            grabAttention ? "" : "hide"
          }`}
        >
          Move me!
        </div>
      )}
    </div>
  );
}
