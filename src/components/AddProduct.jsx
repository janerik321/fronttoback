import { useEffect } from "react";

export default function AddProduct() {
  useEffect(() => {
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
        console.log(data.data);
        console.log(response.status);
        // console.log(response);

        setFetchedData(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
}
