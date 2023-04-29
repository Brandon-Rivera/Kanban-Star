import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/WorkCard.css'

//Funcion para crear los botones de cada tablero
function WorkCard({ title, id }) {

  const navigate = useNavigate();

  const GotoBoard = () => {
    navigate('/board')
    localStorage.setItem('boardid', id)
  }

  return (
    <div className="card text-center">
      <div onClick={() => GotoBoard()} className="btn btn-dark">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
        </div>
      </div>
    </div>
  )
}

export default WorkCard

