import { useRoutes } from "react-router";
import routes from "../routes";
import "./App.css";

function App() {
  const router = useRoutes(routes);
  return <div className="dark:bg-gray-800">{router}</div>;
}

export default App;
