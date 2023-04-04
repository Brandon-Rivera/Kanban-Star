import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [apikey, setApikey] = useState('false');

  useEffect(() => {
    const token = localStorage.getItem('apikey');
    if (token !== 'false') setApikey(token);
    else setApikey('false');
    console.log('apikey: ', apikey);
  }, [apikey]);

  return (
    <div>
      <Router>
        { apikey !== 'false' && <Navbar />}
        <Routes>


          <Route path="/" element={<Login />}></Route>
          <Route path="/workspace" element={apikey !== 'false' && <Workspace />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
