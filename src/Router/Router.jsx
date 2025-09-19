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
import Accounts from "../Layouts/Dashboard/Accounts Part/Accounts";
import PaymentHistory from "../Layouts/Dashboard/History/Payment History/Payments_History";
import ProductHistory from "../Layouts/Dashboard/History/Products sell/ProductsHistory";
import Setting from "../Pages/Setting/Setting";
import Electronics_Products from "../Pages/Products/Electronics Products/Electronics_Products";
import Food from "../Pages/Products/Food/Food";
import Furniture from "../Pages/Products/Furniture/Furniture";
import Clothing from "../Pages/Products/Clothings/Clothing";
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
      },
      {
        path:'/dashboard/accounts',
        element: <Accounts></Accounts>
      },
      {
        path:'/product-history',
        element: <ProductHistory/>
      },
      {
        path: '/payment-history',
        element: <PaymentHistory/>
      },
      {
        path: '/settings',
        element : <Setting></Setting>
      },{
        path: 'products/electronics',
        element: <Electronics_Products />
      },
      {
        path: 'products/food',
        element:<Food></Food>
      },
      {
        path: 'products/furniture',
        element: <Furniture></Furniture>
      },
      {
        path: 'products/clothings',
        element: <Clothing></Clothing>
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


