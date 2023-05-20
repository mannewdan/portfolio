import Icon from "../Icon";
import { SkillT } from "./Skills";

type SkillElementProps = {
  skill: SkillT;
  isHidden?: boolean;
  isGrabbed?: boolean;
};

export default function SkillElement({
  skill,
  isHidden,
  isGrabbed,
}: SkillElementProps) {
  return (
    <div
      className={`skill-element ${isGrabbed ? "grabbed" : ""} ${
        isHidden ? "hidden" : ""
      }`}
    >
      <Icon url={skill.url} />
      <span className="text-h-s">{skill.name}</span>
    </div>
  );
}
