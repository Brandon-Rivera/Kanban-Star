import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import './LanguageCheckbox.css'

const LanguageCheckbox = () => {

    const [t, i18n] = useTranslation("global"); 

    //Recuperamos el estado del Local Storage para que se mantenga así después de renderizar de nuevo el componente.
    const [LanguageChecked, setLanguageChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('LanguageChecked'));
        return savedState ?? false;
    });

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

    //Función para guardar el estado del checkbox en el Local Storage, para que se mantenga.
    useEffect(() => {
        localStorage.setItem('LanguageChecked', JSON.stringify(LanguageChecked));
    }, [LanguageChecked]);

  return (
    <div>
        <label className="switch" id="">
            <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={LanguageChecked} onChange={handleCheckboxChange} ></input>
            <label htmlFor="language-toggle"></label>
            <span className="on">{t("langcheck.es")}</span>
            <span className="off">{t("langcheck.en")}</span>
        </label>
    </div>
  )
}

export default LanguageCheckbox;
