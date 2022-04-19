import { Box } from "../Box";

import styles from "./styles.module.scss";

interface DividerProps {
  title: string;
  url?: string;
  urlName?: string;
}

export function Divider({ title, url, urlName }: DividerProps) {
  return (
    <Box>
      <div className={styles.container}>
        <h2>{title}</h2>
        <a href={url} target="_blank">
          {urlName}
        </a>
      </div>
    </Box>
  );
}
