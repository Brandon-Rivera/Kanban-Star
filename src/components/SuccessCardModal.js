import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import './css/ResInsertCardModal.css'

// Funcion que contiene el componente del modal de exito al insertar una tarjeta
function SuccessCardModal({ show, onHide, title, message, button }) {

    return (
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
                <Button onClick={onHide} className="fw-bold">
                    { button }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessCardModal;