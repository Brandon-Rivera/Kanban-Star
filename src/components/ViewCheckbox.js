import React, { useContext } from 'react'
import './css/ViewCheckbox.css'
import { CiViewTable, CiViewList } from 'react-icons/ci'
import { ViewContext } from '../Contexts/ViewContext'
import { ViewCheckedContext } from '../Contexts/ViewCheckedContext'

const ViewCheckbox = () => {

    const {setView} = useContext(ViewContext);
    const {viewChecked, setViewChecked} = useContext(ViewCheckedContext);

    //Función para cambiar la vista de las tarjetas dependiendo de si el checkbox está checked/unchecked
    function handleViewCheckboxChange(event) {
        setViewChecked(event.target.checked);
        if (event.target.checked) {
            setView("/newboard");
        }
        else {
            setView("/board")
        }
    }

    return (
        <div>
            <label className="switch">
                <input id="view-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={viewChecked} onChange={handleViewCheckboxChange} ></input>
                <label htmlFor="view-toggle"></label>
                <span className="on"><CiViewList size={16} /></span>
                <span className="off"><CiViewTable size={16} /></span>
            </label>
        </div>
    )
}

export default ViewCheckbox