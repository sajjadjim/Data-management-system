import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Homepage from "../Pages/Homepage/Homepage";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Contact from "../Pages/Contact/Contact";
import AddProduct from "../Pages/Add Products/Add_Product";
import Authentication_Dashboard from "../Pages/Authentication/Authentication_Dashboard";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/SignUp/Signup";
import ProductsDashboard from "../Layouts/Dashboard/Products";

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
      },
      {
        path:'/dashboard/products',
        element:<ProductsDashboard></ProductsDashboard>
      }
    ]
  },{
    path:'/auth',
    Component: Authentication_Dashboard,
    children:[
      {
        index: true ,
        element : <Authentication_Dashboard></Authentication_Dashboard>
      },
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/auth/signup',
        element: <Signup></Signup>
      }
      
    ]
  }
]);


