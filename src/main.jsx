import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { Home, Explore, Write, Profile, Post } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/write",
        element: <Write />,
      },{
        path: "/write/:id",
        element : <Write />
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/post/:id",
        element: <Post />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
