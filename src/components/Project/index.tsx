import Link from "next/link";

import { Box } from "../Box";
import { IconLanguages } from "../IconLanguages";

import { FiStar, FiGitBranch, FiFolder } from "react-icons/fi";

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
    <Link href={repository.html_url} passHref>
      <a target="_blank">
        <li className={styles.container}>
          <Box>
            <div className={styles.title}>
              <h3>
                <FiFolder size={20} color="#837E9F" />
                {repository.name}
              </h3>
            </div>

            <p>{repository.description}</p>
            <div className={styles.footer}>
              <div>
                <p>
                  <FiStar size={20} color="#837E9F" />
                  {repository.stargazers_count}
                </p>
                <p>
                  <FiGitBranch size={20} color="#837E9F" />
                  {repository.forks_count}
                </p>
              </div>
              <p>
                <IconLanguages language={repository.language} />
                {repository.language}
              </p>
            </div>
          </Box>
        </li>
      </a>
    </Link>
  );
}
