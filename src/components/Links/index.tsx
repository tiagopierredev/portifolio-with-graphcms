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
              <Link href={contact.link}>
                <a target="_blank">
                  <Image
                    src={contact.image.url}
                    alt={contact.name}
                    height={24}
                    width={24}
                    className={styles.imgLink}
                  />
                  <p>{contact.name}</p>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}
