import styles from "./styles.module.scss";

interface BoxProps {
  children: JSX.Element;
}

export function Box({ children }: BoxProps) {
  return <div className={styles.container}>{children}</div>;
}
