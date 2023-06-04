import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import NewBoardTable from "./NewBoardTable"
import "./css/newBoard.css"
import { DataContext } from '../Contexts/DataContext.js';
import { useNavigate } from "react-router-dom";

export function NewBoard({ api }) {
  //Variable para obtener los datos del workspace en un hook
  const { dataW, forceDataW } = useContext(DataContext);
  const [selectedName, setSelectedName] = useState(null);
  const [, setSelectedWorkspace] = useState('');
  const cardOwners = JSON.parse(localStorage.getItem('owners'));
  const navigate = useNavigate();

  const handleSelection = useMemo(() => {
    return (name) => {
      setSelectedName(name);
    };
  }, []);

  useEffect(() => {
    if (dataW?.data.length > 0) {
      setSelectedWorkspace(dataW.data[0].name);
      handleSelection(dataW.data[0].name);
    }
  }, [handleSelection]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("domain");
    localStorage.removeItem("userid");
    navigate("/");

};

if (cardOwners.mensaje === 'Token inválido') {
    handleLogout()
}

// Se refresca cada vez que se actualiza el estado de dataW
useEffect(() => {
  if( dataW === undefined || dataW === null){
    forceDataW(api, localStorage.getItem('boardid'));
}
    if (cardOwners.mensaje === 'Token inválido') {
        handleLogout()
    }
}, [dataW]);


  return (
    <Container fluid>
      <DropdownButton id="dropdown-basic-button" title="Workspaces" className="d-flex justify-content-center m-2">
        {
          dataW?.data.map(data => (
             data.type === 0 || data.type === 1 ? <Dropdown.Item key={data.id} onClick={() => handleSelection(data.name)} >{data.name}</Dropdown.Item> : []  

          ))
        }
      </DropdownButton>
      {selectedName && (<NewBoardTable nameWF={selectedName} dataWorkspace={dataW} api={api} />)}
    </Container>
  );
}

export default NewBoard;
