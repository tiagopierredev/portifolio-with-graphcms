import { Education } from '../../generated/graphql'
import { Box } from '../Box'
import styles from './styles.module.scss'

interface EducationProps {
  educations?: Education[]
}

export function Education({ educations }: EducationProps) {
  const educationsFormatted = educations?.map(education => {
    return {
      ...education,
      startDate: new Date(education.startDate).getFullYear() + 1,
      endDate: new Date(education.endDate).getFullYear()
    }
  })

  return (
    <Box>
      <h2>Educação</h2>
      <ul className={styles.container}>
        {educationsFormatted?.map((education, indice) => {
          return (
            <li key={indice}>
              <p>{education.institution}</p>
              <p>
                {education.startDate} - {education.endDate}
              </p>
              <p>{education.studyArea}</p>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}
