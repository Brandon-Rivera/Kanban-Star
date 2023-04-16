import React from 'react'
import './WorkCard.css'

//Funcion para crear los botones de cada tablero
function WorkCard({title}) {
  return (
    <div className="card text-center bg-dark">
        <a href="#!" className="btn btn-outline-secondary">
            <div className="card-body text-light">
            <h4 className="card-title">{title}</h4>
            </div>
        </a>
    </div>
  )
}

export default WorkCard