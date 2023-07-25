import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Character from "./components/character";
import Word from "./components/Words";

const router = createBrowserRouter([
  {
    path: "/character,
    element: <Character />,
  },
  {
    path: "/word",
    element: <Word />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
