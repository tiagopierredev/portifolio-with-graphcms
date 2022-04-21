import Image from 'next/image'
import { Box } from '../Box'
import styles from './styles.module.scss'

interface ProfileProps {
  photo?: string
  name?: string
  office?: string
}

export function Profile({ photo, name, office }: ProfileProps) {
  return (
    <Box>
      <div className={styles.container}>
        <Image
          src={photo || ''}
          alt="Foto do Tiago Piere"
          width={128}
          height={128}
          className={styles.photo}
        />
        <h1>{name}</h1>
        <p>{office}</p>
      </div>
    </Box>
  )
}
