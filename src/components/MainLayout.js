import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from "./Navbar";

export const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <div>
        <Outlet></Outlet>
    </div>
    </>
  )
}
