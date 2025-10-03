import React from "react";
import { usePosts } from "@headstartwp/next"; // hook from headstartwp

export default function BlogPage() {
  const { data, isLoading, error } = usePosts({
    perPage: 5,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Failed to load posts.</p>;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Latest Blog Posts</h1>
      {data?.posts?.length ? (
        <ul>
          {data.posts.map((post) => (
            <li key={post.id}>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </main>
  );
}
