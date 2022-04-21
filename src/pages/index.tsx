import { GetServerSideProps } from 'next'
import { AsideBar } from '../components/AsideBar'
import { Profile } from '../components/Profile'

import styles from './Home.module.scss'

import {
  Post,
  PostOrderByInput,
  PostsDocument,
  Profile as ProfileProps,
  ProfileDocument
} from '../generated/graphql'

import client from '../lib/apollo-client'
import { Links } from '../components/Links'
import { Technologies } from '../components/Technologies'

import { Education } from '../components/Education'
import { SectionProjects } from '../components/SectionProjects'

import { api } from '../services/api'
import { Posts } from '../components/Posts'
import { useEffect, useState } from 'react'
import Head from 'next/head'

interface GitHubProps {
  name: string
  description: string
  forks_count: number
  language: string
  stargazers_count: number
  html_url: string
}

interface HomeProps {
  profile: ProfileProps
  github: GitHubProps[]
  posts: Post[]
}

export default function Home({ profile, github, posts }: HomeProps) {
  const [allPosts, setAllPost] = useState<Post[]>(posts)

  async function nextPosts() {
    const lastpost = allPosts.length

    const { data } = await client.query({
      query: PostsDocument,
      variables: {
        first: profile.pagination,
        orderBy: PostOrderByInput.PublishedAtDesc,
        after: allPosts[lastpost - 1].id
      }
    })
    setAllPost([...allPosts, ...data.posts])
  }

  return (
    <>
      <Head>
        <title>Tiago Pierre</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Meu nome é Tiago Pierre, sou estudante de programação desde 2018, ano em que iniciei o curso de Técnico em Informática para Internet (Instituto Federal do Maranhão, concluído). Sou apaixonado pelo o ecossistema JavaScript, o qual me tornei desenvolvedor Front-End certificado pela Rocketseat."
        />
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
      </main>
      <footer className={styles.footer}>Feito com 💜 por Tiago Pierre</footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: ProfileDocument })

  const response = await api.get('/tiagopierre/repos?per_page=2&sort=created')

  const { data: posts } = await client.query({
    query: PostsDocument,
    variables: { first: data.profile.pagination, orderBy: 'publishedAt_DESC' }
  })

  return {
    props: {
      profile: data.profile,
      github: response.data,
      posts: posts.posts
    }
  }
}
