import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import NewBoardTable from "./NewBoardTable"
import "./css/newBoard.css"
import { DataContext } from '../Contexts/DataContext.js';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

//Función principal en la que se hace la peticíon del tablero y se usa el dropdown para filtrar workspaces
export function NewBoard({ api }) {

  //Variable para obtener los datos del workspace en un hook
  const { dataW, forceDataW, dataOw } = useContext(DataContext);
  const [selectedName, setSelectedName] = useState(null);
  const [, setSelectedWorkspace] = useState('');
  const navigate = useNavigate();

  //Función que guarda la opción que seleccionó el usuario en useMemo
  const handleSelection = useMemo(() => {
    return (name) => {
      setSelectedName(name);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("domain");
    Cookies.remove("userid");
    Cookies.remove("boardid");
    Cookies.remove("boardname");
    navigate("/");
  };
  //Función que ayuda a despleglar el primer tablero que haya en workspaces
  useEffect(() => {
    if (dataW?.data.length > 0) {
      setSelectedWorkspace(dataW.data[0].name);
      handleSelection(dataW.data[0].name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[handleSelection])

  // Se refresca cada vez que se actualiza el estado de dataW
  useEffect(() => {
    if (dataW === undefined || dataW === null) {
      forceDataW(api, Cookies.get('boardid'));
    }
    if (dataOw?.mensaje === 'Token inválido') {
      handleLogout();
    }
  });

  //el dropdown solo despliga los workspaces que cumplan con el tipo 0 o 1 y cuando selecciona alguna opcion de dropdown se guarda en usememo 
  //también se manda los datos de la petición al componente NewBoardTable y se manda lo que haya en el hook selectedName
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
