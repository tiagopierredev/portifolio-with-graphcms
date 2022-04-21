import { Box } from '../Box'
import styles from './styles.module.scss'

interface TechnologiesProps {
  skills?: Array<string>
}

export function Technologies({ skills }: TechnologiesProps) {
  return (
    <Box>
      <h2>Tecnologias</h2>
      <ul className={styles.container}>
        {skills?.map((skill, indice) => {
          return <li key={indice}>{skill}</li>
        })}
      </ul>
    </Box>
  )
}
