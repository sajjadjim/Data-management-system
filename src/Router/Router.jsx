import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

export  const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);


