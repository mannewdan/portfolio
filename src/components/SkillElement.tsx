import Icon from "./Icon";
import { SkillT } from "./Skills";

type SkillElementProps = {
  skill: SkillT;
  grabbedSkill: SkillT | null;
  setGrabbedSkill: (skill: SkillT) => void;
  mouseOnGrab: { x: number; y: number };
  mouseNow: { x: number; y: number };
  xSpacing: number;
  ySpacing: number;
  columnCount: number;
  onHover: () => void;
};

export default function SkillElement({
  skill,
  grabbedSkill,
  setGrabbedSkill,
  mouseOnGrab,
  mouseNow,
  xSpacing,
  ySpacing,
  columnCount,
  onHover,
}: SkillElementProps) {
  const { name, url } = skill;
  const isGrabbed =
    skill.name === grabbedSkill?.name && skill.url === grabbedSkill?.url;

  const mouseXOffset = mouseNow.x - mouseOnGrab.x;
  const indexXOffset =
    ((skill.currentIndex % columnCount) - (skill.startIndex % columnCount)) *
    xSpacing;
  const mouseYOffset = mouseNow.y - mouseOnGrab.y;
  const indexYOffset =
    (Math.floor(skill.currentIndex / columnCount) -
      Math.floor(skill.startIndex / columnCount)) *
    ySpacing;

  return (
    <div
      onMouseEnter={() => {
        if (grabbedSkill !== null) {
          onHover();
        }
      }}
      className="skill-cell"
    >
      <div
        onMouseDown={() => setGrabbedSkill(skill)}
        onTouchStart={() => setGrabbedSkill(skill)}
        className={`skill-element ${isGrabbed ? "grabbed" : ""}`}
        style={{
          transform: isGrabbed
            ? `translateX(${mouseXOffset}px) translateY(${mouseYOffset}px)`
            : `translateX(${indexXOffset}px) translateY(${indexYOffset}px)`,
          // "",
          transition: isGrabbed ? "" : "transform 125ms ease-out",
        }}
      >
        <Icon url={url} />
        <span className="text-h-s">{name}</span>
      </div>
    </div>
  );
}
