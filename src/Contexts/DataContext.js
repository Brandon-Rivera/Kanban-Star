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
  // Datos de moveCard
  const [moveCardInfo, setMoveCardInfo] = useState({});

  const updateDataW = (newData) => {
    setDataW(newData);
  };

  const updateDataC = (newData) => {
    setDataC(newData);
  };

  const updateDataOw = (newData) => {
    setDataOw(newData);
  };

  const updateMoveCardInfo = (oldCard, newCard) => {
    setMoveCardInfo({ oldCard, newCard });
  };

  // Funcion para insertar una nueva tarjeta
  const insertNewCard = (newCard) => {
    const workflow = dataW.data.find(
      (workflow) => workflow.id === newCard?.workflow_id
    );

    if (!workflow) {
      return;
    }

    const column = workflow.columns.find(
      (column) => column.id === newCard.column_id
    );

    const subcolumn = column
      ? null
      : findSubcolumn(workflow.columns, newCard.column_id);

    if (!column && !subcolumn) {
      return;
    }

    const target = column || subcolumn;
    newCard.pos = target.mycards.length;
    target.mycards.push(newCard);

    setDataW((prevDataW) => ({
      ...prevDataW,
      data: [...prevDataW.data],
    }));
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

  // Funcion para actualizar los datos de una tarjeta
  const updateCard = (newCard) => {
    setDataW((prevData) => {
      const newData = { ...prevData };

      const workflow = newData.data.find(
        (workflow) => workflow.id === newCard.workflow_id
      );
      if (!workflow) {
        return newData;
      }

      const column = workflow.columns.find(
        (column) => column.id === newCard.column_id
      );
      if (!column) {
        const subcolumn = findSubcolumn(workflow.columns, newCard.column_id);
        if (!subcolumn) {
          return newData;
        }
        const updatedSubcolumn = {
          ...subcolumn,
          mycards: subcolumn.mycards.map((card) =>
            card.id === newCard.id ? { ...card, ...newCard } : card
          ),
        };
        newData.data = newData.data.map((workflow) =>
          workflow.id === newCard.workflow_id
            ? {
                ...workflow,
                columns: updateColumns(workflow.columns, updatedSubcolumn),
              }
            : workflow
        );
      } else {
        const updatedColumn = {
          ...column,
          mycards: column.mycards.map((card) =>
            card.id === newCard.id ? { ...card, ...newCard } : card
          ),
        };
        newData.data = newData.data.map((workflow) =>
          workflow.id === newCard.workflow_id
            ? {
                ...workflow,
                columns: updateColumns(workflow.columns, updatedColumn),
              }
            : workflow
        );
      }

      return newData;
    });
  };

  // Funcion que actualiza las columnas de un workflow
  const updateColumns = (columns, updatedColumn) => {
    return columns.map((column) => {
      if (column.id === updatedColumn.id) {
        return updatedColumn;
      }

      if (column.kids && column.kids.length > 0) {
        return {
          ...column,
          kids: updateColumns(column.kids, updatedColumn),
        };
      }

      return column;
    });
  };

  // Funcion para mover una tarjeta
  const moveCard = (oldCard, newCard) => {
    setDataW((prevData) => {
      const newData = { ...prevData };

      const workflow = newData.data.find(
        (workflow) => workflow.id === oldCard?.workflow_id
      );
      if (!workflow) {
        return newData;
      }

      const column = workflow.columns.find(
        (column) => column.id === oldCard.column_id
      );
      if (!column) {
        const subcolumn = findSubcolumn(workflow.columns, oldCard.column_id);
        if (!subcolumn) {
          return newData;
        }
        const updatedSubcolumn = {
          ...subcolumn,
          mycards: subcolumn.mycards.filter((card) => card.id !== oldCard.id),
        };
        newData.data = newData.data.map((workflow) =>
          workflow.id === oldCard.workflow_id
            ? {
                ...workflow,
                columns: updateColumns(workflow.columns, updatedSubcolumn),
              }
            : workflow
        );
      } else {
        const updatedColumn = {
          ...column,
          mycards: column.mycards.filter((card) => card.id !== oldCard.id),
        };
        newData.data = newData.data.map((workflow) =>
          workflow.id === oldCard.workflow_id
            ? {
                ...workflow,
                columns: updateColumns(workflow.columns, updatedColumn),
              }
            : workflow
        );
      }

      return newData;
    });
    insertNewCard(newCard);
  };

  // Funcion para obtener los datos del board
  // en caso de que no existan.
  const forceDataW = async (api, id) => {
    const values = {
      boardid: id,
    };

    const response = await fetch(`${api}/board`, {
      headers: {
        "Content-Type": "application/json",
        "supra-access-token": localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    updateDataW(data);

    const response1 = await fetch(`${api}/owners`, {
      headers: {
        "Content-Type": "application/json",
        "supra-access-token": localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(values),
    });
    const data1 = await response1.json();
    updateDataOw(data1);
    localStorage.setItem("owners", JSON.stringify(data));
  };

  // Valores que se pasan al contexto
  const contextValues = {
    dataW,
    updateDataW,
    dataC,
    updateDataC,
    dataOw,
    moveCardInfo,
    updateDataOw,
    insertNewCard,
    updateCard,
    moveCard,
    updateMoveCardInfo,
    forceDataW
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
};
