import { Children, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page from "./pages/Page";
import Register from "./pages/Register";
import Comment from "./pages/Comment";
import './style.scss'
import RequireAuth from "./context/RequireAuth";
import { AuthContextProvider } from "./context/authContext";
import Grades from "./pages/Grades";
import Nopage from "./pages/Nopage";
import UpdateUser from "./pages/UpdateUser";
import axios from 'axios';
import Teacherpage from "./pages/Teacherpage";
import Students from "./pages/Students";

function App() {
 
const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {path:"/",
        element: <RequireAuth><Home/></RequireAuth>,
        },
        {path:"/post/:id",
        element:<RequireAuth><Page/></RequireAuth>
        },
        {path:"/Comment",
        element:<RequireAuth><Comment/></RequireAuth> 
        },
        {path:"/Grades/:id",
        element:<RequireAuth><Grades/></RequireAuth> 
        },
        {path:"Teacherpage",
        element:<RequireAuth><Teacherpage/></RequireAuth> 
        },
        {path:"Students/:id",
        element:<RequireAuth><Students/></RequireAuth> 
        },               
        {path:"*",
        element:<RequireAuth><Nopage/></RequireAuth> 
        }
        
        
      ] 
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    ,
    {path:"/updateUser/:id",
    element: <AuthContextProvider><UpdateUser/> </AuthContextProvider>
        },
  ]);



  return (
    <div className="App">
      
      <div className="container">
      <AuthContextProvider>  <RouterProvider router={router} /></AuthContextProvider>
          </div>
    </div>
  );
}

export default App;
