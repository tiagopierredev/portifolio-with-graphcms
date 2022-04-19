import { GetServerSideProps } from "next";
import { AsideBar } from "../components/AsideBar";
import { Profile } from "../components/Profile";

import styles from "./Home.module.scss";

import { ProfileDocument, ProfileQuery } from "../generated/graphql";

import client from "../lib/apollo-client";
import { Links } from "../components/Links";
import { Technologies } from "../components/Technologies";

import { Education } from "../components/Education";
import { SectionProjects } from "../components/SectionProjects";

import { api } from "../services/api";
import { Posts } from "../components/Posts";

interface GitHubProps {
  name: string;
}

interface HomeProps {
  profile: ProfileQuery;
  github: GitHubProps[];
}

export default function Home({ profile, github }: HomeProps) {
  return (
    <main className={styles.container}>
      <AsideBar>
        <Profile
          name={profile?.name}
          office={profile?.office}
          photo={profile?.photo?.url}
        />
        <Links contacts={profile?.contact} />
        <Technologies skills={profile?.skills} />
        <Education educations={profile?.education} />
      </AsideBar>
      <div className={styles.home}>
        <SectionProjects github={github} />
        <Posts />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: ProfileDocument });

  const response = await api.get("/tiagopierre/repos?per_page=2&sort=created");

  return {
    props: {
      profile: data.profile,
      github: response.data,
    },
  };
};
