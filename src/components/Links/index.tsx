import { Contact } from '../../generated/graphql'
import { Box } from '../Box'
import styles from './styles.module.scss'

interface LinksProps {
  contacts: Array<Contact>
}

export function Links({ contacts }: LinksProps) {
  return (
    <Box>
      <ul className={styles.container}>
        {contacts?.map(contact => {
          return (
            <li key={contact.id}>
              <a href={contact.link}>
                <img src={contact.image.url} alt={contact.name} />
                {contact.name}
              </a>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}
