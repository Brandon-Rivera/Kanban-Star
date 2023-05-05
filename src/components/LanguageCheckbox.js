import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import './css/LanguageCheckbox.css'
import { LanguageCheckedContext } from "../Contexts/LanguageCheckedContext";

const LanguageCheckbox = () => {

    const {LanguageChecked, setLanguageChecked} = useContext(LanguageCheckedContext);
    const [t, i18n] = useTranslation("global"); 


    //Función para cambiar el idioma de la aplicación dependiendo de si el checkbox está checked/unchecked
    function handleCheckboxChange(event) {
        setLanguageChecked(event.target.checked);

        if (event.target.checked) {
            i18n.changeLanguage("en");
        }
        else {
            i18n.changeLanguage("es");
        }
    }

  return (
    <div>
        <label className="switch">
            <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={LanguageChecked} onChange={handleCheckboxChange} ></input>
            <label htmlFor="language-toggle"></label>
            <span className="on">{t("langcheck.es")}</span>
            <span className="off">{t("langcheck.en")}</span>
        </label>
    </div>
  )
}

export default LanguageCheckbox;
