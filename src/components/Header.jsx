import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import Fetcher from "./Fetcher";
import styled from "styled-components";

const LogInForm = styled.form`
  margin: 20px 0;
`;

export default function Header() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    submitter,
    setSubmitter,
    token,
    setToken,
  } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitter(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password: password }),
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/login",
          requestOptions
        );

        // console.log(response.json());
        const responseToken = await response.json();

        setToken(responseToken.token);

        if (response.status === 200) {
          console.log("Login successful");
        } else {
          console.log("login failed");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }

  return (
    <>
      <h1>Header</h1>
      {!token && (
        <LogInForm onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Log in" />
        </LogInForm>
      )}
      {token && <h3>Welcome {username}</h3>}
      <Link to="/fronttoback/">Home </Link>
      <Link to="/fronttoback/products">Products </Link>
      <Link to="/fronttoback/orders">Orders</Link>
    </>
  );
}
