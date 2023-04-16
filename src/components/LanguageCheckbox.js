import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import './LanguageCheckbox.css'

const LanguageCheckbox = () => {

    const [t, i18n] = useTranslation("global"); 
    const [isChecked, setIsChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('isChecked'));
        return savedState ?? false;
    });

    //
    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            i18n.changeLanguage("en");
        }
        else {
            i18n.changeLanguage("es");
        }
    }

    //
    useEffect(() => {
        localStorage.setItem('isChecked', JSON.stringify(isChecked));
    }, [isChecked]);

  return (
    <div>
        <label className="switch">
            <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} ></input>
            <label htmlFor="language-toggle"></label>
            <span className="on">ES</span>
            <span className="off">EN</span>
        </label>
    </div>
  )
}

export default LanguageCheckbox;
