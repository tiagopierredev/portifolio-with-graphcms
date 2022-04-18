import { Contact } from "../../generated/graphql";
import { Box } from "../Box";
import styles from "./styles.module.scss";

interface LinksProps {
  links: Contact[];
}

export function Links({ links }: LinksProps) {
  return (
    <Box>
      <ul className={styles.container}>
        {links.map((link) => {
          return (
            <li>
              <a href={link.link}>
                <img src={link.image.url} alt={link.name} />
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
