import Fetcher from "../components/Fetcher";

export default function OrdersView() {
  const fetchWhat = "http://localhost:3500/api/orders";

  Fetcher(fetchWhat);
  return <h1>OrdersView</h1>;
}
