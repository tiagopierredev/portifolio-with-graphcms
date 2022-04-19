import { Contact } from "../../generated/graphql";
import { Box } from "../Box";
import styles from "./styles.module.scss";

interface LinksProps {
  contacts: Array<Contact>;
}

export function Links({ contacts }: LinksProps) {
  return (
    <Box>
      <ul className={styles.container}>
        {contacts?.map((contact, indice) => {
          return (
            <li key={indice}>
              <a href={contact.link} target="_blank">
                <img src={contact.image.url} alt={contact.name} />
                {contact.name}
              </a>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
