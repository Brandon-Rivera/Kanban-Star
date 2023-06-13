import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Workspace } from "./components/Workspace";
import { Board } from "./components/Board";
import { NewBoard } from "./components/NewBoard"
import { ProtectedRoute } from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainLayout } from "./components/MainLayout";
import "./App.css";
import { ThemeContext } from "./Contexts/ThemeContext";
import { DataProvider } from "./Contexts/DataContext";

function App() {
  //Link del api
  const apiLink = process.env.REACT_APP_API_LINK;
  //const apiLink = "http://localhost:3001";

  const { theme } = useContext(ThemeContext);

  return (
      <div className="App2" id={theme}>
        <DataProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Login api = {apiLink}/>}></Route>
                <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route path="workspace" index element={<Workspace api = {apiLink}/>}></Route>
                  <Route path="board" index element={<Board api = {apiLink}/>}></Route>
              <Route path="newBoard" index element={<NewBoard api = {apiLink}/>}></Route>
                </Route>
            </Routes>
          </Router>
        </DataProvider>
    </div>
  );
}

export default App;