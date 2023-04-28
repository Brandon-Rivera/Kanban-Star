import React from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function MoveCardModal({show, onHide}) {
    return (
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header>Seleccionar carril</Modal.Header>
            <Modal.Body>
                ZS
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveCardModal