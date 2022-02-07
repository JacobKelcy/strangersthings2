import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../util";
import { API_URL } from "../config";
import FormContainer from "../layout/FormContainer";

export default function CreatePost({ posts, setPosts, updateMe }) {
  const history = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const token = getTokenFromLocalStorage();

  const postFields = [
    { id: 1, name: "title", value: form.title },
    { id: 2, name: "description", value: form.description },
    { id: 3, name: "price", value: form.price },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: { ...form },
        }),
      });

      const { data } = await response.json();

      setPosts([data.post, ...posts]);
      updateMe();
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <>
        s
        {postFields.map(({ id, name, value }) => (
          <div key={id}>
            <label htmlFor={name}>{name}</label>
            <input
              type={"text"}
              name={name}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
      </>
      <input type="submit" value="create my post!" />
    </FormContainer>
  );
}
