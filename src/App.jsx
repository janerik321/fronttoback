import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export const AppContext = createContext();

export default function App() {
  const [fetchedData, setFetchedData] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitter, setSubmitter] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAdder, setProductAdder] = useState(false);
  const [fetching, setFetching] = useState(true);

  return (
    <AppContext.Provider
      value={{
        fetchedData,
        setFetchedData,
        username,
        setUsername,
        password,
        setPassword,
        submitter,
        setSubmitter,
        productId,
        setProductId,
        productName,
        setProductName,
        productCategory,
        setProductCategory,
        productStock,
        setProductStock,
        productPrice,
        setProductPrice,
        productAdder,
        setProductAdder,
        fetching,
        setFetching,
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </AppContext.Provider>
  );
}
