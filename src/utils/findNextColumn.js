// Funcion que recibe un workflow y un id de columna 
// y devuelve el id de la siguiente columna
export default function findNextColumn(cols, colId) {
  let adjacentColumnID, adjacentSubcolumnID;
  let columnIndex = -1;
  let subcolumnIndex = -1;

  for (let i = 0; i < cols.columns.length; i++) {
    const column = cols.columns[i];
    if (column.id === colId) {
      columnIndex = i;
      break;
    }

    if (column.kids.length > 0) {
      for (let j = 0; j < column.kids.length; j++) {
        const subcolumn = column.kids[j];
        if (subcolumn.id === colId) {
          columnIndex = i;
          subcolumnIndex = j;
          break;
        }
      }
    }
  }

  if (columnIndex >= 0) {
    const column = cols.columns[columnIndex];

    if (subcolumnIndex >= 0) {
      if (subcolumnIndex < column.kids.length - 1) {
        adjacentColumnID = column.id;
        adjacentSubcolumnID = column.kids[subcolumnIndex + 1].id;
      } else if (columnIndex < cols.columns.length - 1) {
        const nextColumn = cols.columns[columnIndex + 1];
        if (nextColumn.kids.length > 0) {
          adjacentColumnID = nextColumn.id;
          adjacentSubcolumnID = nextColumn.kids[0].id;
        } else {
          adjacentColumnID = nextColumn.id;
          adjacentSubcolumnID = null;
        }
      }
    } else if (columnIndex < cols.columns.length - 1) {
      adjacentColumnID = cols.columns[columnIndex + 1].id;
      if (cols.columns[columnIndex + 1].kids.length > 0) {
        adjacentSubcolumnID = cols.columns[columnIndex + 1].kids[0].id;
      } else {
        adjacentSubcolumnID = null;
      }
    }
  }

  return {
    adjacentColumnID,
    adjacentSubcolumnID,
  };
}
