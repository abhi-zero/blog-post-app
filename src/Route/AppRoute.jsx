import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "../App";
import { Home, Explore, Write, Profile, Post, Auth } from "../pages";
import { useGetCurrentUserQuery } from "../api/authApi";

function ProtectRoute({user, children}){
  if(!user) return <Navigate to='/auth' replace />
  return children;
}

export default function AppRoutes() {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <div className="flex justify-center items-center-safe min-h-[100vh]"><p>Loading...</p></div>; // prevent flicker

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
          element: (
            <ProtectRoute user={user}>
              <Write />
            </ProtectRoute>
          ),// protect Write route
        },
        {
          path: "/write/:id",
          element:  (
            <ProtectRoute user={user}>
              <Write />
            </ProtectRoute>
          ),
        },
        {
          path: "/profile",
          element:  (
            <ProtectRoute user={user}>
              <Profile />
            </ProtectRoute>
          ), // protect Profile route
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
