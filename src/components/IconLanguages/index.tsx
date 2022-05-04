import { SiTypescript, SiJavascript, SiHtml5, SiCss3 } from "react-icons/si";

interface IconLanguageProps {
  language: string;
}

export function IconLanguages({ language }: IconLanguageProps) {
  return (
    <>
      {language === "JavaScript" ? (
        <SiJavascript color="#f1e05a" />
      ) : language === "TypeScript" ? (
        <SiTypescript color="#2b7489 " />
      ) : language === "HTML" ? (
        <SiHtml5 color="#e34c26" />
      ) : language === "CSS" ? (
        <SiCss3 color="#563d7c " />
      ) : (
        ""
      )}
    </>
  );
}
