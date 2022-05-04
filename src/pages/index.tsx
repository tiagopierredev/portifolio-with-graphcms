import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { AsideBar } from "../components/AsideBar";
import { Profile } from "../components/Profile";
import { Links } from "../components/Links";
import { Technologies } from "../components/Technologies";
import { Education } from "../components/Education";
import { SectionProjects } from "../components/SectionProjects";
import { Posts } from "../components/Posts";
import { BackToTop } from "../components/backToTop";

import {
  Post,
  PostOrderByInput,
  PostsDocument,
  Profile as ProfileProps,
  ProfileDocument,
} from "../generated/graphql";

import { api } from "../services/api";
import client from "../lib/apollo-client";

import styles from "./Home.module.scss";

interface GitHubProps {
  name: string;
  description: string;
  forks_count: number;
  language: string;
  stargazers_count: number;
  html_url: string;
}

interface HomeProps {
  profile: ProfileProps;
  github: GitHubProps[];
  posts: Post[];
}

export default function Home({ profile, github, posts }: HomeProps) {
  const [allPosts, setAllPost] = useState<Post[]>(posts);

  const [scrollY, SetScrollY] = useState(false);

  async function nextPosts() {
    const lastpost = allPosts.length;

    const { data } = await client.query({
      query: PostsDocument,
      variables: {
        first: profile.pagination,
        orderBy: PostOrderByInput.PublishedAtDesc,
        after: allPosts[lastpost - 1].id,
      },
    });
    setTimeout(() => {
      setAllPost([...allPosts, ...data.posts]);
    }, 500);
  }

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 1000) {
        SetScrollY(true);
      } else {
        SetScrollY(false);
      }
    });
  });

  return (
    <>
      <Head>
        <title>{profile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={`${profile.name}`} />
        <meta property="og:type" content="blog" />
        <meta property="og:image" content={`${profile.photo?.url}`} />
        <meta property="pg:url" content="bio.tiagopierre.tech" />
        <meta property="og:description" content={`${profile.bio}`} />
        <meta name="description" content={`${profile.bio}`} />
      </Head>

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

          <Posts posts={allPosts} profile={profile} nextPosts={nextPosts} />
        </div>

        {!!scrollY && <BackToTop />}
      </main>

      <footer className={styles.footer}>Feito com 💜 por Tiago Pierre</footer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: ProfileDocument });

  const response = await api.get("/tiagopierre/repos?per_page=2&sort=pushed");

  const { data: posts } = await client.query({
    query: PostsDocument,
    variables: { first: data.profile.pagination, orderBy: "publishedAt_DESC" },
  });

  return {
    props: {
      profile: data.profile,
      github: response.data,
      posts: posts.posts,
    },
  };
};
