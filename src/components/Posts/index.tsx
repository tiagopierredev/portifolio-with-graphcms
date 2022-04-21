import Image from 'next/image'
import { useEffect, useRef } from 'react'
import {
  Post,
  PostOrderByInput,
  Profile,
  usePostsQuery
} from '../../generated/graphql'
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

  const { data } = usePostsQuery({
    variables: {
      first: profile.pagination,
      orderBy: PostOrderByInput.PublishedAtDesc,
      after: posts[posts.length - 1].id
    }
  })

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
      <Divider title="Recent Posts" url="#" />

      <ul className={styles.container}>
        {posts?.map((post, indice) => {
          return (
            <li key={indice}>
              <Box>
                <div className={styles.profile}>
                  <Image
                    className={styles.imgProfile}
                    height={48}
                    width={48}
                    src={`${profile?.photo?.url}`}
                    alt={profile?.name}
                  />
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

        {data?.posts.length !== 0 ? (
          <div ref={scrollRef} className={styles.scroll}>
            <div className={styles['lds-ring']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          ''
        )}
      </ul>
    </>
  )
}
