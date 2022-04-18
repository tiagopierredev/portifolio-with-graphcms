import { Box } from "../Box";
import styles from "./styles.module.scss";

interface ProfileProps {
  photo?: string;
  name?: string;
  office?: string;
}

export function Profile({ photo, name, office }: ProfileProps) {
  return (
    <Box>
      <div className={styles.container}>
        <img src={photo || ""} alt="Foto do Tiago Piere" />
        <h1>{name}</h1>
        <p>{office}</p>
      </div>
    </Box>
  );
}
