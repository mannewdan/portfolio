import Icon from "./Icon";

type SkillElementProps = {
  name: string;
  url: string;
};

export default function SkillElement({ name, url }: SkillElementProps) {
  return (
    <div className="skill-element">
      <Icon url={url} />
      <span className="text-h-s">{name}</span>
    </div>
  );
}
