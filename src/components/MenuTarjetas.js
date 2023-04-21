import React from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function MenuTarjetas({show, title, message, onHide}) {
  return (
    <>
        <Modal show={show} onHide={onHide} size='lg' centered>
        <Modal.Header className='bg-success'>{title}</Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default MenuTarjetas