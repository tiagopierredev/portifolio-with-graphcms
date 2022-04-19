import { Divider } from "../Divider";
import { Project } from "../Project";
import styles from "./styles.module.scss";

interface GitHubProps {
  name: string;
  description: string;
  forks_count: number;
  language: string;
  stargazers_count: number;
  html_url: string;
}

interface SectionHomeProps {
  github: GitHubProps[];
}

export function SectionProjects({ github }: SectionHomeProps) {
  return (
    <section className={styles.container}>
      <Divider
        title="My Projects"
        url="https://github.com/tiagopierre?tab=repositories"
        urlName="Veja todos"
      />
      <ul className={styles.projects}>
        {github.map((repo) => {
          return <Project repository={repo} />;
        })}
      </ul>
    </section>
  );
}
