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
  const duration = 150;
  const [timer, setTimer] = useState(duration);
  let ratio = timer / duration;
  ratio = ratio * ratio * ratio;

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => {
          return Math.max(0, prev - 10);
        });
      }, 10);
    }
  }, [timer]);

  return (
    <div
      id={skill.name}
      className={`skill-element ${isGrabbed ? "grabbed" : ""} ${
        isHidden ? "hidden" : ""
      }`}
      style={{
        transform: startingOffset
          ? `translateX(${startingOffset.x * ratio}px) translateY(${
              startingOffset.y * ratio
            }px)`
          : "",
      }}
    >
      <Icon url={skill.url} />
      <span className="text-h-s">{skill.name}</span>
    </div>
  );
}
