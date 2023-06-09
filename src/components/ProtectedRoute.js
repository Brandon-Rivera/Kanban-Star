import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const ProtectedRoute = ({children}) => {
  const user = Cookies.get('token');

  //Si no hay usuario o token redirecciona al login
  if(!user)
    return <Navigate to='/' replace />;
  
  return children
}