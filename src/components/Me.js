import React from "react";
import styled from "styled-components";
import { API_URL } from "../config";

const MeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  margin: 0 auto;
`;

const MyContent = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  & h2 {
    border-bottom: 1px solid black;
    margin-bottom: 0;
  }
`;

//this had styled.title.div but it tries to make third a function
const BtnAndTitle = styled.title`
  & {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
  }
  & button {
    margin-right: 8px;
  }
`;

export default function Me({ me, updateMe, token }) {
  if (!me || (me && !me._id)) return null;

  let { messages, posts } = me || {};

  posts = posts.filter((post) => post.active);

  let sent = messages.filter((msg) => msg.fromUser.id === me._id).slice(0, 3);
  let recieved = messages
    .filter((msg) => msg.fromUser._id !== me._id)
    .slice(0, 3);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        posts = posts.filter((post) => post._id !== postId);
        updateMe();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MeContainer>
      <MyContent>
        <h2>Sent</h2>
        {sent.map((msg, idx) => (
          <div key={idx}>
            <h3>{msg.post.title}</h3>
            <div>From: {msg.fromUser.username}</div>
            <div>Message: {msg.content}</div>
          </div>
        ))}
        <br />
        <h2>Recieved</h2>
        {recieved.map((msg, idx) => (
          <div key={idx}>
            <h3>{msg.post.title}</h3>
            <div>From: {msg.fromUser.username}</div>
            <div>Message: {msg.content}</div>
          </div>
        ))}
      </MyContent>
      <MyContent>
        <h2>My Posts</h2>
        {posts.map((post) => (
          <BtnAndTitle key={post.id}>
            <button onClick={() => handleDelete(post._id)}>x</button>
            <span>{post.title}</span>
          </BtnAndTitle>
        ))}
      </MyContent>
    </MeContainer>
  );
}
