import React, { useState, useEffect, useMemo } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import NewBoardTable from "./NewBoardTable"
import "./css/newBoard.css"

export function NewBoard({ api }) {
  //Variable para obtener los datos del workspace en un hook
  const [dataWorkspace, setDataWorkspace] = useState({ data: [] });
  const [selectedName, setSelectedName] = useState(null);
  const [, setSelectedWorkspace] = useState('');

  const handleSelection = useMemo(() => {
    return (name) => {
      setSelectedName(name);
    };
  }, []);

  useEffect(() => {
    if (dataWorkspace.data.length > 0) {
      setSelectedWorkspace(dataWorkspace.data[0].name);
      handleSelection(dataWorkspace.data[0].name);
    }
  }, [dataWorkspace.data, handleSelection]);

  useEffect(() => {

    //Valores necesarios para la peticion get de workspace
    const values = {
      boardid: localStorage.getItem('boardid') //actualizar
    }

    //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
    const getWorkSpace = async () => {

      const response = await fetch(`${api}/board`, {
        headers: {
          'Content-Type': 'application/json',
          'supra-access-token': localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(values)
      })
      const data = await response.json()
      setDataWorkspace(data)
    }

    //llamada a la funcion
    getWorkSpace()
  }, [api])


  return (
    <Container fluid>
      <DropdownButton id="dropdown-basic-button" title="Workspaces" className="d-flex justify-content-center m-2">
        {
          dataWorkspace.data.map(data => (
             data.type === 0 || data.type === 1 ? <Dropdown.Item key={data.id} onClick={() => handleSelection(data.name)} >{data.name}</Dropdown.Item> : []  

          ))
        }
      </DropdownButton>
      {selectedName && (<NewBoardTable nameWF={selectedName} dataWorkspace={dataWorkspace} api={api} />)}
    </Container>
  );
}

export default NewBoard;
