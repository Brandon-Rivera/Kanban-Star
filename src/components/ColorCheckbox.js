import React, {useContext} from 'react'
import './css/ColorCheckbox.css'
import {RiSunLine, RiMoonLine} from 'react-icons/ri'
//import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { ColorCheckedContext} from '../Contexts/ColorCheckedContext';
import { ThemeContext } from '../Contexts/ThemeContext';
import { ToggleButton } from 'react-bootstrap';

const ColorCheckbox = () => {

    const {theme, setTheme} = useContext(ThemeContext)
    const {colorChecked, setColorChecked} = useContext(ColorCheckedContext);

    //Función para cambiar la paleta de colores dependiendo de si el checkbox está checked/unchecked
    function handleColorCheckboxChange(event) {
        setColorChecked(event.target.checked);
        localStorage.setItem('ColorChanged', "true");
        if(event.target.checked) {
            setTheme("dark");
        }
        else{
            setTheme("light");
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

  return (
    <div>
        <ToggleButton
            className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-dark"
            checked={colorChecked}
          
            size={20}
            onChange={handleColorCheckboxChange}
      >
        {showCurrentTheme()}
      </ToggleButton>
    </div>
  )
}

export default ColorCheckbox