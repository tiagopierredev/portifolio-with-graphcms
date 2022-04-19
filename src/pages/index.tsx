import { GetServerSideProps } from 'next'
import { AsideBar } from '../components/AsideBar'
import { Profile } from '../components/Profile'
import { SectionHome } from '../components/SectionHome'

import styles from './Home.module.scss'

import { ProfileDocument, ProfileQuery } from '../generated/graphql'

import client from '../lib/apollo-client'
import { Links } from '../components/Links'
import { Technologies } from '../components/Technologies'
import { Divider } from '../components/Divider'

export default function Home({ profile }: ProfileQuery) {
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
      </AsideBar>
      <SectionHome>
        <Divider title="My Projects" url="#" urlName="Veja todos" />
      </SectionHome>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: ProfileDocument })

  return {
    props: {
      profile: data.profile
    }
  }
}
