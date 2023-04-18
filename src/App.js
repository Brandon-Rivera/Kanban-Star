import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import { Board } from "./components/Board";
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
            <Route path="workspace" index element={<Workspace/>}></Route>
            <Route path="board" index element={<Board/>}></Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
