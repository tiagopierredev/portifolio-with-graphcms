import { usePostsQuery, useProfileQuery } from '../../generated/graphql'
import { Box } from '../Box'
import { Divider } from '../Divider'
import styles from './styles.module.scss'

export function Posts() {
  const { data } = usePostsQuery()
  const { data: profile } = useProfileQuery()

  return (
    <>
      <Divider title="Recent Posts" />

      <ul>
        {data?.posts.map((post, indice) => {
          return (
            <li key={indice} className={styles.container}>
              <Box>
                <div className={styles.profile}>
                  <img
                    src={profile?.profile?.photo?.url}
                    alt={profile?.profile?.name}
                  />
                  <div>
                    <p>{profile?.profile?.name}</p>
                    <p>{profile?.profile?.office}</p>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content.html }}
                ></div>
              </Box>
            </li>
          )
        })}
      </ul>
    </>
  )
}
