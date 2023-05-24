import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('token');
  if(!user)
    return <Navigate to='/' replace />;
  
  return children
}