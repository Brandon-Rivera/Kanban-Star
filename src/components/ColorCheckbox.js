import React, {useState, useEffect} from 'react'
import './ColorCheckbox.css'
import {RiSunLine, RiMoonLine} from 'react-icons/ri'

const ColorCheckbox = () => {

    //Recuperamos el estado del Local Storage para que se mantenga así después de renderizar de nuevo el componente.
    const [ColorChecked, setColorChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('ColorChecked'));
        return savedState ?? false;
    });

    //Función para cambiar la paleta de colores dependiendo de si el checkbox está checked/unchecked
    function handleColorCheckboxChange(event) {
        setColorChecked(event.target.checked);
        if (event.target.checked) {
            console.log("Color checked")
        }
        else {
            console.log("Color unchecked")
        }
    }

    //Función para guardar el estado del checkbox en el Local Storage, para que se mantenga.
    useEffect(() => {
        localStorage.setItem('ColorChecked', JSON.stringify(ColorChecked));
    }, [ColorChecked]);
    
  return (
    <div>
        <label className="switch">
            <input id="color-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={ColorChecked} onChange={handleColorCheckboxChange} ></input>
            <label htmlFor="color-toggle"></label>
            <span className="on"><RiSunLine size = {16}/></span>
            <span className="off"><RiMoonLine size={16}/></span>
        </label>
    </div>
  )
}

export default ColorCheckbox