import React, { useState, useEffect, useMemo } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import NewBoardTable from "./newBoardTable"

export function NewBoard({ api }) {
  //Variable para obtener los datos del workspace en un hook
  const [dataWorkspace, setDataWorkspace] = useState({ data: [] });
  const [selectedName, setSelectedName] = useState(null);

  const handleSelection = useMemo(() => {
    return (name) => {
      setSelectedName(name);
    };
  }, []);

  useEffect(() => {

    //Valores necesarios para la peticion get de workspace
    const values = {
      domain: localStorage.getItem('domain'),
      apikey: localStorage.getItem('apikey'),
      boardid: 19 //actualizar
    }

    //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
    const getWorkSpace = async () => {

      const response = await fetch(`${api}/board`, {
        headers: {
          'Content-Type': 'application/json'
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
      <DropdownButton id="dropdown-basic-button" title="Workspaces">
        {
          dataWorkspace.data.map(data => (
            <Dropdown.Item key={data.id} onClick={() => handleSelection(data.name)} >{data.name}</Dropdown.Item>
          ))
        }
      </DropdownButton>
      {selectedName && (<NewBoardTable nameWF={selectedName} dataWorkspace={dataWorkspace} />)}
    </Container>
  );
}

export default NewBoard;
