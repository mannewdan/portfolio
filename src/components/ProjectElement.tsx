import { ProjectT } from "./Projects";

type ProjectElementProps = {
  project: ProjectT;
};

export default function ProjectElement({ project }: ProjectElementProps) {
  let segments = project.description.split("^^").map((item) => {
    if (typeof item === "string") {
      return item.split("@@");
    } else return item;
  }) as Array<string | Array<string>>;

  let descriptionEls = [] as Array<JSX.Element>;
  segments.forEach((segment, index) => {
    if (Array.isArray(segment) && segment.length > 1) {
      segment.forEach((item, i) => {
        descriptionEls.push(<span key={item + " " + i}>{item}</span>);

        if (project.descriptionLinkName && i < segment.length - 1) {
          descriptionEls.push(
            <a
              key={project.descriptionLinkName + " " + i}
              href={project.descriptionLinkUrl}
              target="_blank"
            >
              {project.descriptionLinkName}
            </a>
          );
        }
      });
    } else {
      descriptionEls.push(<span key={segment + " " + index}>{segment}</span>);
    }

    if (project.descriptionStrong && index < segments.length - 1)
      descriptionEls.push(
        <strong key={project.descriptionStrong + " " + index}>
          {project.descriptionStrong}
        </strong>
      );
  });
  const tagEls = project.tags.map((item) => {
    return (
      <p key={item.name} className={`tag text-h-s ${item.bold ? "bold" : ""}`}>
        {item.name}
      </p>
    );
  });

  return (
    <div className={`project-element ${project.featured ? "featured" : ""}`}>
      <img src={project.img}></img>
      <div className="title-container">
        <p className="title text-h-s">{project.name}</p>
        <div className="tags-container">{tagEls}</div>
      </div>

      <p className="description c-text-75">{descriptionEls}</p>

      <div className="links-container">
        <a target="_blank" href={project.live}>
          View Live
        </a>
        <a target="_blank" href={project.repo}>
          View Code
        </a>
      </div>
    </div>
  );
}
