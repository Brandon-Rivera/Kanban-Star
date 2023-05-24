import React from 'react';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

// Funcion que contiene el componente del modal de confirmacion de actualizar tarjeta
const ConfirmCardModal = ({ show, onHide, onConfirm, title, message, acceptButton, denyButton }) => {
  const handleConfirmUpdate = () => {
    onConfirm(true);
  };
  
  const handleCancelUpdate = () => {
    onConfirm(false);
  };
  return (
    <>
      <Modal
            show={show} 
            onHide={onHide}
            centered
            backdrop = 'static'>
            <Modal.Header className="modalHeader bg-success">
                <Modal.Title className="fw-bold text-white">
                    { title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="fw-bold"> { message } </p>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button onClick={() => {onHide(); handleCancelUpdate()}} className="fw-bold">
                    { denyButton }
                </Button>
                <Button onClick={() => {onHide(); handleConfirmUpdate()}} className="fw-bold">
                    { acceptButton }
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ConfirmCardModal