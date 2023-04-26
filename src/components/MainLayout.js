import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./Navbar";
import SettingsModal from './SettingsModal';
import './MainLayout.css'


export const MainLayout = () => {

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  //Método para mostrar el modal de configuración en el layout. 
  //Este método se manda a Navbar y se activa cuando se hace click en "Configuración"

  const toggleShowModal = () => {
    setShowSettingsModal(!showSettingsModal);
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
