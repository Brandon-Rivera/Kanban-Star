import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/workspace" element={<Workspace />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
