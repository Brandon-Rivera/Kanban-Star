import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/WorkCard.css'
import { ViewContext } from '../Contexts/ViewContext';

//Funcion para crear los botones de cada tablero
function WorkCard({ title, id, api }) {

  const {view} = useContext(ViewContext);

  const navigate = useNavigate();

  const GotoBoard = () => {
    navigate(view)
    localStorage.setItem('boardid', id)
  }

  // Funcion para obtener los owners de un board
  const getBoardOwners = async () => {
    const response = await fetch(`${api}/owners`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        {
          boardid: id,
          domain: localStorage.getItem('domain'),
          apikey: localStorage.getItem('apikey')
        }
      )
    })
    const data = await response.json()
    localStorage.setItem('owners', JSON.stringify(data))
    GotoBoard();
  }

  return (
    <div className="card text-center">
      <div onClick={() => getBoardOwners()} className="btn btn-dark">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
        </div>
      </div>
    </div>
  )
}

export default WorkCard

