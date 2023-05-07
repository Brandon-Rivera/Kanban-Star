import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MoveCardModal from './MoveCardModal';
import CommentsModal from './CommentsModal';

function CardMenu({ show, title, onHide, cardID, dataWorkspace, workflowPos, api }) {

  const [t] = useTranslation("global");
  const [modalShowMove, setModalShowMove] = useState(false);
  const [modalShowComments, setModalShowComments] = useState(false);


  const consultar = () => {
    console.log("Consultar")
  }

  const mover = () => {
    setModalShowMove(true)
  }

  const actualizar = () => {
    console.log("Actualizar")
  }

  const comentarios = () => {
    setModalShowComments(true);
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
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => consultar()}>{t("cardMenu.show")}</Button></Col>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => mover()}>{t("cardMenu.move")}</Button></Col>
            </Row>
            <Row>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => actualizar()}>{t("cardMenu.update")}</Button></Col>
              <Col className='p-1 m-1 d-flex justify-content-center'><Button className='fw-bold text-dark border border-3 border-dark d-block w-100' onClick={() => comentarios()}>{t("cardMenu.comment")}</Button></Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col className='p-0'></Col>
              <Col><Button variant='danger' className='fw-bold text-white border border-3 border-dark pl-5 pr-5' onClick={() => eliminar()}>{t("cardMenu.delete")}</Button></Col>
              <Col className='p-0'></Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Modales */}
      <MoveCardModal show={modalShowMove} onHide={() => setModalShowMove(false)} dataWorkspace={dataWorkspace} workflowPos={workflowPos} api={api}/>
      {/*<CommentsModal show={modalShowComments} onHide = {() => setModalShowComments(false)} cardID = {cardID} api={api} />*/}
    </>
  )
}

export default CardMenu