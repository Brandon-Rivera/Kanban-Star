import React, {useState, useEffect, useContext} from 'react'
import './ColorCheckbox.css'
import {RiSunLine, RiMoonLine} from 'react-icons/ri'
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { ThemeContext } from '../App';
import { ToggleButton } from 'react-bootstrap';

const ColorCheckbox = () => {

    const {theme, setDark, setLight} = useContext(ThemeContext);

    //Recuperamos el estado del Local Storage para que se mantenga así después de renderizar de nuevo el componente.
    const [ColorChecked, setColorChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('ColorChecked'));
        return savedState ?? false;
    });

    //Función para cambiar la paleta de colores dependiendo de si el checkbox está checked/unchecked
    function handleColorCheckboxChange(event) {
        setColorChecked(event.target.checked);
        if(event.target.checked) {
            setDark();
        }
        else{
            setLight();
        }
    }

    const showCurrentTheme = () => {
        if(theme === "dark"){
            return <RiMoonLine size={20}/>
        }

        else{
            return <RiSunLine size={20}/>
        }
    }

    //Función para guardar el estado del checkbox en el Local Storage, para que se mantenga.
    useEffect(() => {
        localStorage.setItem('ColorChecked', JSON.stringify(ColorChecked));
    }, [ColorChecked]);
    
  return (
    <div>
        <ToggleButton
            className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-dark"
            checked={ColorChecked}
          
            size={20}
            onChange={handleColorCheckboxChange}
      >
        {showCurrentTheme()}
      </ToggleButton>
    </div>
  )
}

export default ColorCheckbox