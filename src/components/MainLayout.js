import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from "./Navbar";
import SettingsModal from './SettingsModal';
import { BsShopWindow } from 'react-icons/bs';

export const MainLayout = () => {

  const [showSettingsModal, setShowSettingsModal] = useState();

  const toggleShowModal = () =>{
    setShowSettingsModal(!showSettingsModal);
  }
  
  return (
    <>
    <Navbar onClickSettings = {toggleShowModal}/>
    <SettingsModal show = {showSettingsModal} onHide = {() => setShowSettingsModal(false)}/>
    <div>
        <Outlet></Outlet>
    </div>
    </>
  )
}
