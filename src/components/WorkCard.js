import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/WorkCard.css'

//Funcion para crear los botones de cada tablero
function WorkCard({ title, id, api }) {

  const navigate = useNavigate();

  const GotoBoard = () => {
    navigate('/board')
    localStorage.setItem('boardid', id)
    localStorage.setItem('boardname', title)
  }

  // Funcion para obtener los owners de un board
  const getBoardOwners = async () => {
    const response = await fetch(`${api}/owners`, {
      headers: {
        'Content-Type': 'application/json',
        'supra-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(
        {
          boardid: id
        }
      )
    })
    const data = await response.json()

    if (data.mensaje === 'Token inválido') {
      navigate('/');
    }
    else{
      localStorage.setItem('owners', JSON.stringify(data))
      GotoBoard();
    }
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

