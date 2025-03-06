import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import Fetcher from "./Fetcher";

export default function Header() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    submitter,
    setSubmitter,
  } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitter(true);
  }
  useEffect(() => {
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

        console.log(response.status);
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
  }, [submitter]);

  return (
    <>
      <h1>Header</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log in" />
      </form>
      <Link to="/fronttoback/">Home </Link>
      <Link to="/fronttoback/products">Products </Link>
      <Link to="/fronttoback/orders">Orders</Link>
    </>
  );
}
