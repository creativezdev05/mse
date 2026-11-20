import Link from "next/link";

type ProjectCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  location: string;
  type: string;
  href: string;
  linkLabel: string;
};

export function ProjectCard({
  eyebrow,
  title,
  description,
  location,
  type,
  href,
  linkLabel,
}: ProjectCardProps) {
  return (
    <article className="card project-card">
      <div className="project-card-media">
        <span className="project-card-placeholder">Photography placeholder</span>
      </div>
      <div className="project-card-body">
        <p className="type-label">{eyebrow}</p>
        <h3 className="project-card-title">{title}</h3>
        <p>{description}</p>
        <div className="project-card-meta">
          <div>
            <p className="type-label">Location</p>
            <p>{location}</p>
          </div>
          <div>
            <p className="type-label">Type</p>
            <p>{type}</p>
          </div>
        </div>
        <Link href={href} className="project-card-link">
          <span className="project-card-link-label">{linkLabel}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
