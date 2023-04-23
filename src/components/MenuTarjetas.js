import React from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MenuTarjetas({ show, title, onHide }) {
  return (
    <>
      <Modal show={show} onHide={onHide} size='lg' centered className='text-center'>
        <Modal.Header className='bg-success'>
          <Modal.Title className='fw-bold'>{title}</Modal.Title><CloseButton onClick={onHide}/>
        </Modal.Header>
        <Modal.Body className='p-1'>
          <Container>
            <Row>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100'>Consultar</Button></Col>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100'>Mover</Button></Col>
            </Row>
            <Row>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100'>Actualizar</Button></Col>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100'>Comentarios</Button></Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col className='p-0'></Col>
              <Col><Button variant='danger' className='fw-bold text-dark border border-3 border-dark'>Eliminar</Button></Col>
              <Col className='p-0'></Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MenuTarjetas