import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { setTokenNull } from "../util/index";

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 40px;
`;

const Logo = styled.span`
  font-size: 22px;
  font-weight: bold;
`;

const LinksContainer = styled.div`
  & * {
    margin-left: 10px;
  }
`;

const loggedOutLinks = [
  { id: 1, name: "home", to: "/home" },
  { id: 2, name: "login", to: "/login" },
  { id: 3, name: "register", to: "/register" },
];

const loggedInLinks = [
  { id: 1, name: "home", to: "/home" },
  { id: 2, name: "new", to: "/posts/new" },
  { id: 3, name: "me", to: "/users/me" },
];

export default function Nav({ isLoggedIn, setIsLoggedIn, setMe }) {
  const history = useNavigate();
  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const logout = () => {
    setTokenNull();
    setIsLoggedIn(false);
    setMe({});
    history.push("/home");
  };

  return (
    <NavContainer>
      <Logo>Strangers Things</Logo>
      <LinksContainer>
        {links.map(({ id, name, to }) => (
          <Link key={id} to={to}>
            {name}
          </Link>
        ))}
        {isLoggedIn && (
          <Link to={""} onClick={() => logout()}>
            logout
          </Link>
        )}
      </LinksContainer>
    </NavContainer>
  );
}
