import { useEffect, useContext } from "react";
import { AppContext } from "../App";

export default function Fetcher() {
  const {
    submitter,
    setSubmitter,
    fetchedData,
    setFetchedData,
    username,
    setUsername,
    password,
    setPassword,
    fetching,
    setFetching,
  } = useContext(AppContext);

  //   console.log(fetchWhat);

  useEffect(() => {
    setSubmitter(false);
    setFetching(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/products"
          //   requestOptions
        );
        const data = await response.json();
        console.log(data.data);
        console.log(response.status);
        // console.log(response);

        setFetchedData(data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [submitter]);
}
