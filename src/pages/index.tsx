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
    const { data } = await client.query({
      query: PostsDocument,
      variables: {
        first: profile.pagination,
        orderBy: PostOrderByInput.PublishedAtDesc,
        after: allPosts[2].id
      }
    })
    console.log(data.post)
  }

  return (
    <>
      <Head>
        <title>My page title</title>
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
