import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./Login";
import { Workspace } from "./components/Workspace";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/workspace" element={<Workspace />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
