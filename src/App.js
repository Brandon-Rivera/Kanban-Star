import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import { Board } from "./components/Board";
import Test from "./components/Test";
import { ProtectedRoute } from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainLayout } from "./components/MainLayout";
import './App.css'

export const ThemeContext = createContext(null);

function App() {

  //Funcion para borrar el APIKEY despues de 1 hora
  setTimeout(() => {
    localStorage.removeItem('apikey');
  }, 36000000);

  //Link del api
  const apiLink = "https://kvxrvsgw6c.execute-api.us-east-1.amazonaws.com"

  const [theme, setTheme] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem('Theme'));
    return savedState ?? false;
  });

  const setDark = () => {
    setTheme("dark");
  }

  const setLight = () => {
    setTheme("light");
  }

  useEffect(() => {
    localStorage.setItem('Theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setDark, setLight }}>
      <div className="App2" id={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login api = {apiLink}/>}></Route>
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="workspace" index element={<Workspace api = {apiLink}/>}></Route>
              <Route path="board" index element={<Board />}></Route>
              <Route path="test" index element={<Test />}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
