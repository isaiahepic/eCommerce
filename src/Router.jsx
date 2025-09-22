import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Details from "@/pages/Details";
import Error from "@/pages/Error";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default Router;
