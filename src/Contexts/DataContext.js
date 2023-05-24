import React, { createContext, useState } from "react";

export const DataContext = createContext();

// Componente que almacena los datos de la aplicación
export const DataProvider = ({ children }) => {
  // Datos de Board
  const [dataW, setDataW] = useState(null);
  // Datos de Card
  const [dataC, setDataC] = useState(null);
  // Datos de Owner
  const [dataOw, setDataOw] = useState(null);


  const updateDataW = newData => {
    setDataW(newData);
  };

  const updateDataC = newData => {
    setDataC(newData);
  };

  const updateDataOw = newData => {
    setDataOw(newData);
  }

  // Valores que se pasan al contexto
  const contextValues = {
    dataW,
    updateDataW,
    dataC,
    updateDataC,
    dataOw,
    updateDataOw
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  )
}