import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home, Explore, Write, Profile, Post, Auth } from "../pages";
import { useGetCurrentUserQuery } from "../api/authApi";

export default function AppRoutes() {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading...</p>; // prevent flicker

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Explore />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/write",
          element: user ? <Write /> : <Auth />, // protect Write route
        },
        {
          path: "/write/:id",
          element: user ? <Write /> : <Auth />,
        },
        {
          path: "/profile",
          element: user ? <Profile /> : <Auth />, // protect Profile route
        },
        {
          path: "/post/:id",
          element: <Post />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
