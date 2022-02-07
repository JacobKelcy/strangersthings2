import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostContainer = styled.div`
  & {
    padding: 20px;
    margin-bottom: 20px;
  }
  & > div {
    margin-bottom: 8px;
  }
`;

export default function Posts({ posts, isLoggedIn }) {
  if (!posts) return null;

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostContainer key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div>price: {post.price}</div>
          <div>seller: {post.author.username}</div>
          {isLoggedIn && post.isAuthor && (
            <div>
              messages: {post.messages.length}
              <br />
              {post.messages.length ? (
                <Link to={`/users/${post.author._id}/messages`}>
                  {">> view messages"}
                </Link>
              ) : null}
            </div>
          )}
          {isLoggedIn && !post.isAuthor && (
            <Link to={`/post/${post._id}/messages/new?title=${post.title}`}>
              {"message the seller"}
            </Link>
          )}
        </PostContainer>
      ))}
    </>
  );
}
