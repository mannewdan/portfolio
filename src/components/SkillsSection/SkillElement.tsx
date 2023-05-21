import { useState, useEffect } from "react";
import Icon from "../Icon";
import { SkillT } from "./Skills";

type SkillElementProps = {
  skill: SkillT;
  isHidden?: boolean;
  isGrabbed?: boolean;
  startingOffset?: { x: number; y: number } | undefined;
};

export default function SkillElement({
  skill,
  isHidden,
  isGrabbed,
  startingOffset,
}: SkillElementProps) {
  const [moveToDestination, setMoveToDestination] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMoveToDestination(true);
    }, 1);
  }, []);

  return (
    <div
      id={skill.name}
      className={`skill-element ${isGrabbed ? "grabbed" : ""} ${
        isHidden ? "hidden" : ""
      } ${moveToDestination ? "move-to-destination" : ""}`}
      style={{
        transform: startingOffset
          ? `translateX(${startingOffset.x}px) translateY(${startingOffset.y}px)`
          : "",
      }}
    >
      <Icon url={skill.url} />
      <span className="text-h-s">{skill.name}</span>
    </div>
  );
}
