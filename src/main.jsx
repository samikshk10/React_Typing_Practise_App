import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Type from "./components/Type";
import Result from "./components/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Type />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
