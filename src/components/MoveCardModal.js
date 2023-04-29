import React from 'react'
import { Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import { BsRecordCircleFill } from "react-icons/bs"

function MoveCardModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header className='bg-success'>
                <Modal.Title className='fw-bold text-white'>Selecciona carril</Modal.Title><CloseButton onClick={onHide} />
            </Modal.Header>
            <Modal.Body>

                <Form>
                    {['checkbox'].map((type) => (
                        <div key={`reverse-${type}`} className="mb-3">
                            <Row>
                                <Col className='d-flex justify-content-center m-0 p-0' centered>
                                    <BsRecordCircleFill className='d-flex justify-content-center m-1' size={25}/>
                                    <h3>hola</h3>
                                </Col>
                                <Col className='m-0 p-0'>
                                    <Form.Check
                                        reverse
                                        name="group1"
                                        type={type}
                                        id={`reverse-${type}-1`}
                                    />
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveCardModal