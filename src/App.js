import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //Funcion para borrar el APIKEY despues de 1 hora
  setTimeout(() => {
    localStorage.removeItem('apikey');
  }, 36000000);

  return (
    <div>
      <Router>
        {/* Condicion para que muestre un componente dependiendo si hay APIKEY o no */}
        <ProtectedRoute><Navbar /></ProtectedRoute>
        <Routes>

          <Route path="/" element={<Login />}></Route>
          <Route path="/workspace" element={<ProtectedRoute><Workspace /></ProtectedRoute>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
