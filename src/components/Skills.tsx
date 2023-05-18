import SkillElement from "./SkillElement";
import data from "../skilldata.json";

export default function Skills() {
  const skillEls = data.map((item) => {
    return <SkillElement name={item.name} url={item.url} />;
  });

  return (
    <section className="skills">
      <h2 className="text-h-m">Skills</h2>

      <div className="padded-container">
        <div className="grid">{skillEls}</div>
      </div>
    </section>
  );
}
