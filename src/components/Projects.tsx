import { useState } from "react";
import ProjectElement from "./ProjectElement";
import data from "../projectdata.json";

export type ProjectT = {
  name: string;
  live: string;
  repo: string;
  img: string;
  featured?: boolean;
  description: string;
  descriptionStrong?: string;
  descriptionLinkName?: string;
  descriptionLinkUrl?: string;
};

export default function Projects() {
  const [projects] = useState<Array<ProjectT>>(data);

  //rendering
  const projectEls = projects.map((item) => {
    return <ProjectElement key={item.name} project={item} />;
  });
  return (
    <section className="projects">
      <div id="projects" className="scroll-destination"></div>
      <h2 className="text-h-m">Projects</h2>

      <div className="padded-container">
        <div className="grid">{projectEls}</div>
      </div>
    </section>
  );
}
