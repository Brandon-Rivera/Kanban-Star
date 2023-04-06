import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [apikey, setApikey] = useState('false');

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
