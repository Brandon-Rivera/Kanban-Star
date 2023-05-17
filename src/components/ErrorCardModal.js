import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import './css/ErrInsertCardModal.css'

// Funcion que contiene el componente del modal de error al insertar una tarjeta
function ErrorCardModal({ show, onHide, title, message, button }) {

    return (
        <Modal
            show={show} 
            onHide={onHide}
            centered
            backdrop = 'static'>
            <Modal.Header className="bg-danger fw-bold text-white">
                <Modal.Title>
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

export default ErrorCardModal;