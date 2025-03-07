import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import Fetcher from "../components/Fetcher";
import styled from "styled-components";

const AddProductForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr 1fr 1fr;
  margin-bottom: 1rem;
  > * {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  /* width: 95wv; */
  display: grid;

  /* gap: 0.2rem; */
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr 1fr 1fr;
  padding: 2px 0;
`;

const GridTitle = styled.div`
  font-weight: 700;
`;

const GridElement = styled.div`
  background-color: #eef;
  padding: 4px 0;
`;

const AddButton = styled.input`
  background-color: #7e7;
  border: 1px solid #4d4;
  border-radius: 5px;
`;

const UpdateForm = styled.form`
  display: grid;
  grid-template-columns: 9fr 1fr;
  /* row */
  /* justify-content: end; */
`;

const UpdateButton = styled.input`
  background-color: #aaf;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
`;

const DeleteButton = styled.button`
  background-color: #f77;
  border: none;
  border-radius: 5px;
`;

export default function ProductsView() {
  const {
    setSubmitter,
    fetchedData,
    setFetchedData,
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
    token,
  } = useContext(AppContext);
  //   const fetchWhat = "http://localhost:3500/api/products";

  Fetcher();

  function handleAddProduct(e) {
    e.preventDefault();
    // console.log(productName, productCategory, productStock, productPrice);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productName,
        category: productCategory,
        stock: productStock,
        price: productPrice,
      }),
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/products",
          requestOptions
        );
        const data = await response.json();
        console.log(response.status);
        console.log("fetcher");
        // console.log(response);

        // setFetchedData(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    setSubmitter(true);
  }

  function handleUpdateProduct(e) {
    e.preventDefault();
    // console.log(productName, productCategory, productStock, productPrice);
    console.log(productId, "hello");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        category: productCategory,
        stock: productStock,
        price: productPrice,
      }),
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3500/api/products/${productId}`,
          requestOptions
        );
        const data = await response.json();
        console.log(response.status);
        console.log("fetcher");
        // console.log(response);

        // setFetchedData(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    setSubmitter(true);
  }

  function handleRemove(id) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3500/api/products/${id}`,
          requestOptions
        );
        const data = await response.json();
        console.log(response.status);
        console.log("fetcher");
        // console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    setSubmitter(true);
  }

  return (
    <>
      <h1>ProductsView</h1>
      <AddProductForm onSubmit={(e) => handleAddProduct(e)}>
        <input
          type="number"
          placeholder="id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="stock"
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          step="0.01"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <AddButton type="submit" value="Add" />
      </AddProductForm>
      <UpdateForm onSubmit={(e) => handleUpdateProduct(e)}>
        <div />
        <UpdateButton type="submit" value="Update" />
      </UpdateForm>
      {/* {console.log(fetching)} */}
      {fetchedData && !fetching && (
        <>
          <GridContainer>
            <GridItem>
              <GridTitle>Id</GridTitle>
              <GridTitle>Name</GridTitle>
              <GridTitle>Category</GridTitle>
              <GridTitle>Stock</GridTitle>
              <GridTitle>Price</GridTitle>
            </GridItem>
            {fetchedData.map(({ id, name, category, stock, price }) => (
              <GridItem key={id}>
                <GridElement>{id}</GridElement>
                <GridElement>{name}</GridElement>
                <GridElement>{category}</GridElement>
                <GridElement>{stock}</GridElement>
                <GridElement>{price}</GridElement>
                <DeleteButton onClick={() => handleRemove(id)}>
                  Delete
                </DeleteButton>
              </GridItem>
            ))}

            {/* <GridItem key={fetchedData.id}>
              <GridElement>#{fetchedData.id}</GridElement>
              <GridElement>{fetchedData.name}</GridElement>
              <GridElement>{fetchedData.category}</GridElement>
              <GridElement>{fetchedData.stock}</GridElement>
              <GridElement>{fetchedData.price}</GridElement>
            </GridItem> */}
          </GridContainer>
        </>
      )}
    </>
  );
}
