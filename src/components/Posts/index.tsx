import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  Post,
  PostOrderByInput,
  PostsDocument,
  Profile,
  usePostsQuery
} from '../../generated/graphql'
import client from '../../lib/apollo-client'
import { Box } from '../Box'
import { Divider } from '../Divider'
import styles from './styles.module.scss'

interface PostsProps {
  posts: Post[]
  profile: Profile
  nextPosts: () => void
}

export function Posts({ posts, profile, nextPosts }: PostsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(entities => {
      const target = entities[0]

      if (target.isIntersecting) {
        nextPosts()
      }
    }, options)

    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }
  }, [nextPosts])

  return (
    <>
      <Divider title="Recent Posts" />

      <ul className={styles.container}>
        {posts?.map((post, indice) => {
          return (
            <li key={indice}>
              <Box>
                <div className={styles.profile}>
                  <Image src={`${profile?.photo?.url}`} alt={profile?.name} />
                  <div>
                    <p>{profile?.name}</p>
                    <p>{profile?.office}</p>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content.html }}
                ></div>
              </Box>
            </li>
          )
        })}

        <div ref={scrollRef}></div>

        {/* {data?.posts.length !== 0 ? (
          <button onClick={nextPosts}>Carregar mais</button>
        ) : (
          ""
        )} */}
      </ul>
    </>
  )
}
