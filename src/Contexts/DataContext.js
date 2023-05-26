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

  const updateDataW = (newData) => {
    setDataW(newData);
  };

  const updateDataC = (newData) => {
    setDataC(newData);
  };

  const updateDataOw = (newData) => {
    setDataOw(newData);
  };

  // Funcion para insertar una nueva tarjeta
  const insertNewCard = (newCard) => {
    const workflow = dataW.data.find(
      (workflow) => workflow.id === newCard.workflow_id
    );

    const column = workflow.columns.find(
      (column) => column.id === newCard.column_id
    );
    if (!column) {
      const subcolumn = findSubcolumn(workflow.columns, newCard.column_id);
      if(!subcolumn){
        return;
      }
      newCard.pos = subcolumn.mycards.length;
      subcolumn.mycards.push(newCard);
      setDataW({ ...dataW });
      return;
    }
    newCard.pos = column.mycards.length;
    column.mycards.push(newCard);
    setDataW({ ...dataW });
  };

  // Funcion para buscar una subcolumna en un workflow
  const findSubcolumn = (columns, columnId) => {
    for (const column of columns) {
      if (column.kids && column.kids.length > 0) {
        const subcolumn = column.kids.find((kids) => kids.id === columnId);
        if (subcolumn) {
          return subcolumn;
        } else {
          const found = findSubcolumn(column.kids, columnId);
          if (found) {
            return found;
          }
        }
      }
    }
    return null;
  };

  // Valores que se pasan al contexto
  const contextValues = {
    dataW,
    updateDataW,
    dataC,
    updateDataC,
    dataOw,
    updateDataOw,
    insertNewCard
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
};
