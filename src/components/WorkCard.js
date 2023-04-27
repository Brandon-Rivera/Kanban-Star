import React from 'react'
import { useNavigate } from 'react-router-dom'
import './WorkCard.css'

//Funcion para crear los botones de cada tablero
function WorkCard({ title, id }) {

  const navigate = useNavigate();

  const GotoBoard = () => {
    navigate('/board')
    localStorage.setItem('boardid', id)
  }

  return (
    <div className="card text-center bg-dark">
      <a href={() => navigate('/board')} onClick={() => GotoBoard()} className="btn btn-outline-secondary">
        <div className="card-body text-light">
          <h4 className="card-title">{title}</h4>
        </div>
      </a>
    </div>
  )
}

export default WorkCard