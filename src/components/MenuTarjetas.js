import React from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MenuTarjetas({ show, title, onHide }) {

  const consultar = () => {
    console.log("Consultar")
  }

  const mover = () => {
    console.log("Mover")
  }

  const actualizar = () => {
    console.log("Actualizar")
  }

  const comentarios = () => {
    console.log("Comentarios")
  }

  const eliminar = () => {
    console.log("Eliminar")
  }

  return (
    <>
      <Modal show={show} onHide={onHide} size='lg' centered className='text-center'>
        <Modal.Header className='bg-success'>
          <Modal.Title className='fw-bold text-white'>{title}</Modal.Title><CloseButton onClick={onHide}/>
        </Modal.Header>
        <Modal.Body className='p-1'>
          <Container>
            <Row>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => consultar()}>Consultar</Button></Col>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => mover()}>Mover</Button></Col>
            </Row>
            <Row>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => actualizar()}>Actualizar</Button></Col>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => comentarios()}>Comentarios</Button></Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col className='p-0'></Col>
              <Col><Button variant='danger' className='fw-bold text-white border border-3 border-dark pl-5 pr-5' onClick={() => eliminar()}>Eliminar</Button></Col>
              <Col className='p-0'></Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MenuTarjetas