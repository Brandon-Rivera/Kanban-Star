import React, {useState, useEffect} from 'react'
import './ViewCheckbox.css'
import {CiViewTable, CiViewList} from 'react-icons/ci'

const ViewCheckbox = () => {

    const [viewChecked, setViewChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('viewChecked'));
        return savedState ?? false;
    });

    //
    function handleViewCheckboxChange(event) {
        setViewChecked(event.target.checked);
        if (event.target.checked) {
            console.log("View checked")
        }
        else {
            console.log("View unchecked")
        }
    }

    //
    useEffect(() => {
        localStorage.setItem('viewChecked', JSON.stringify(viewChecked));
    }, [viewChecked]);
    
  return (
    <div>
        <label className="switch">
            <input id="view-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={viewChecked} onChange={handleViewCheckboxChange} ></input>
            <label htmlFor="view-toggle"></label>
            <span className="on"><CiViewTable size={16}/></span>
            <span className="off"><CiViewList size={16}/></span>
        </label>
    </div>
  )
}

export default ViewCheckbox