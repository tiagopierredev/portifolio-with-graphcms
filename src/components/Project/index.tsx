import { Box } from "../Box";
import styles from "./styles.module.scss";

interface ProjectProps {
  repository: {
    name: string;
    description: string;
    forks_count: number;
    language: string;
    stargazers_count: number;
    html_url: string;
  };
}

export function Project({ repository }: ProjectProps) {
  return (
    <a href={repository.html_url} target="_blank">
      <li className={styles.container}>
        <Box>
          <h3>
            <img src="./paste.svg" />
            {repository.name}
          </h3>
          <p>{repository.description}</p>
          <div className={styles.footer}>
            <div>
              <p>
                <img src="./star.svg" alt="" />
                {repository.stargazers_count}
              </p>
              <p>
                <img src="./git-branch.svg" alt="" />
                {repository.forks_count}
              </p>
            </div>
            <p>{repository.language}</p>
          </div>
        </Box>
      </li>
    </a>
  );
}
