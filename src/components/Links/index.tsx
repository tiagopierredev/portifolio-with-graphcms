import Image from 'next/image'
import Link from 'next/link'
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
        {contacts?.map((contact, indice) => {
          return (
            <li key={indice}>
              <Link href={`${contact.link}`}>
                <a target="_blank" rel="noreferrer">
                  <Image src={contact.image.url} alt={contact.name} />
                  {contact.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}
