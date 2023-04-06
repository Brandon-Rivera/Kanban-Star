import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  // Asignacion de variables y hooks
  const [apikey, setApikey] = useState('false');

  //Funcion para borrar el APIKEY despues de 1 hora
  setTimeout(() => {
    localStorage.removeItem('apikey');
  }, 36000000);

  useEffect(() => {

    //Funcion para obtener el Apikey
    const getApikey = () => {
      const token = localStorage.getItem('apikey');
      if (token !== 'false') {
        setApikey(token);
      }
      else {
        setApikey('false');
      }
    }

    getApikey()

  }, []);

  return (
    <div>
      <Router>
        {/* Condicion para que muestre un componente dependiendo si hay APIKEY o no */}
        {apikey !== 'false' && <Navbar />}
        <Routes>

          <Route path="/" element={apikey === 'false' && <Login />}></Route>
          <Route path="/workspace" element={apikey !== 'false' && <Workspace />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
