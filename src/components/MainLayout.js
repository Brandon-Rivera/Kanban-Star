import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./Navbar";
import SettingsModal from './SettingsModal';
import './css/MainLayout.css'
import { ThemeContext } from '../Contexts/ThemeContext';
import { useTranslation } from 'react-i18next';



export const MainLayout = () => {

  const {theme} = useContext(ThemeContext);

  const [i18n] = useTranslation("global");

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  //Método para mostrar el modal de configuración en el layout. 
  //Este método se manda a Navbar y se activa cuando se hace click en "Configuración"

  const toggleShowModal = () => {
    setShowSettingsModal(!showSettingsModal);
    localStorage.setItem("CurrentTheme", theme);
    localStorage.setItem("CurrentLanguage", i18n.language);
  }

  return (
    <div>
      <Navbar onClickSettings={toggleShowModal} />
      <SettingsModal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}/>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
