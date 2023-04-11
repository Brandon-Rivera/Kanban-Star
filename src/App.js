import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import { ProtectedRoute } from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainLayout } from "./components/MainLayout";

function App() {

  //Funcion para borrar el APIKEY despues de 1 hora
  setTimeout(() => {
    localStorage.removeItem('apikey');
  }, 36000000);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/workspace" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
            <Route index element={<Workspace/>}></Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
