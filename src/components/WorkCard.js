import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./css/WorkCard.css";
import { DataContext } from "../Contexts/DataContext";
import { ViewContext } from '../Contexts/ViewContext';
import Cookies from "js-cookie";

//Funcion para crear los botones de cada tablero
function WorkCard({ title, id, api }) {

  const {view} = useContext(ViewContext);
  const navigate = useNavigate();

  // Hook para actualizar el estado de informacion en Board
  const { updateDataW, updateDataOw } = useContext(DataContext);

  const GotoBoard = () => {
    const expireCookie = 1/24;
    Cookies.set('boardid', id, { expires: expireCookie, secure: true, sameSite: 'strict' });
    Cookies.set('boardname', title, { expires: expireCookie, secure: true, sameSite: 'strict' });
    navigate(view)
  }

  // Funcion para obtener la informacion de un board
  const getWorkSpace = async () => {
    const values = {
      boardid: id,
    };

    const response = await fetch(`${api}/board`, {
      headers: {
        "Content-Type": "application/json",
        "supra-access-token": Cookies.get("token"),
      },
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    updateDataW(data);
    getBoardOwners();
  };

  // Funcion para obtener los owners de un board
  const getBoardOwners = async () => {
    const response = await fetch(`${api}/owners`, {
      headers: {
        "Content-Type": "application/json",
        "supra-access-token": Cookies.get("token"),
      },
      method: "POST",
      body: JSON.stringify({
        boardid: id,
      }),
    });
    const data = await response.json();
    updateDataOw(data);

    if (data.mensaje === 'Token inválido') {
      navigate('/');
    }
    else{
      GotoBoard();
    };
  }

  return (
    <div className="card text-center">
      <div onClick={() => getWorkSpace()} className="btn btn-dark">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
        </div>
      </div>
    </div>
  );
}

export default WorkCard;
