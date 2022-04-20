import { useEffect, useRef, useState } from "react";
import {
  Post,
  PostOrderByInput,
  PostsDocument,
  Profile,
  usePostsQuery,
} from "../../generated/graphql";
import client from "../../lib/apollo-client";
import { Box } from "../Box";
import { Divider } from "../Divider";
import styles from "./styles.module.scss";

interface PostsProps {
  firstPosts: Post[];
  profile: Profile;
}

export function Posts({ firstPosts, profile }: PostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [idNextPage, setIdNextPage] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // const { data } = usePostsQuery({
  //   variables: {
  //     first: profile.pagination,
  //     orderBy: PostOrderByInput.PublishedAtDesc,
  //     after: posts[posts.length - 1].id,
  //   },
  // });

  async function nextPosts() {
    console.log();
    const { data } = await client.query({
      query: PostsDocument,
      variables: {
        first: profile.pagination,
        orderBy: PostOrderByInput.PublishedAtDesc,
        after: idNextPage,
      },
    });

    setPosts([...posts, ...(data?.posts as Post[])]);
  }

  useEffect(() => {
    setPosts(firstPosts);
    setIdNextPage(firstPosts[firstPosts.length - 1].id);
  }, firstPosts);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        nextPosts();
      }
    }, options);

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }
  }, []);

  return (
    <>
      <Divider title="Recent Posts" />

      <ul className={styles.container}>
        {posts?.map((post, indice) => {
          return (
            <li key={indice}>
              <Box>
                <div className={styles.profile}>
                  <img src={profile?.photo?.url} alt={profile?.name} />
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
          );
        })}

        <div ref={scrollRef}></div>

        {/* {data?.posts.length !== 0 ? (
          <button onClick={nextPosts}>Carregar mais</button>
        ) : (
          ""
        )} */}
      </ul>
    </>
  );
}
