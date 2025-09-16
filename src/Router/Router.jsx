import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Homepage from "../Pages/Homepage/Homepage";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Contact from "../Pages/Contact/Contact";
import AddProduct from "../Pages/Add Products/Add_Product";

export  const router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:"products",
        element:<Products></Products>
      },
      {
        path:'/contact',
        element: <Contact />
      },
      {
        path:'/add-product',
        element:<AddProduct></AddProduct>
      }
    ]
  },
]);


