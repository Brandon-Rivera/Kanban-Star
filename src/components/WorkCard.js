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

  // Funcion para obtener los owners de un board
  const getBoardOwners = async () => {
    const response = await fetch('http://localhost:3001/owners', {
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
}

  return (
    <div className="card text-center bg-dark">
      <a href={() => navigate('/board')} onClick={() => {GotoBoard(); getBoardOwners();}} className="btn btn-outline-secondary">
        <div className="card-body text-light">
          <h4 className="card-title">{title}</h4>
        </div>
      </a>
    </div>
  )
}

export default WorkCard