import styles from "./styles.module.scss";

interface AsideBarProps {
  children: JSX.Element[];
}

export function AsideBar({ children }: AsideBarProps) {
  return <aside className={styles.container}>{children}</aside>;
}
