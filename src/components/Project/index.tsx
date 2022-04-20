import Image from 'next/image'
import Link from 'next/link'
import { Box } from '../Box'
import styles from './styles.module.scss'

interface ProjectProps {
  repository: {
    name: string
    description: string
    forks_count: number
    language: string
    stargazers_count: number
    html_url: string
  }
}

export function Project({ repository }: ProjectProps) {
  return (
    <Link href={repository.html_url} passHref>
      <a target="_blank">
        <li className={styles.container}>
          <Box>
            <h3>
              <Image src="./paste.svg" alt={repository.name} />
              {repository.name}
            </h3>
            <p>{repository.description}</p>
            <div className={styles.footer}>
              <div>
                <p>
                  <Image src="./star.svg" alt="star count" />
                  {repository.stargazers_count}
                </p>
                <p>
                  <Image src="./git-branch.svg" alt="git forker" />
                  {repository.forks_count}
                </p>
              </div>
              <p>{repository.language}</p>
            </div>
          </Box>
        </li>
      </a>
    </Link>
  )
}
