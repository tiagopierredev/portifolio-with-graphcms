import styles from "./styles.module.scss";

interface SectionHomeProps {
  children: JSX.Element;
}

export function SectionHome({ children }: SectionHomeProps) {
  return <aside>{children}</aside>;
}
