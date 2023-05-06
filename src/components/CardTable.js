import React from 'react'
import { Container, ListGroup, Row, Col, Button, Card } from 'react-bootstrap';

import "./css/CardTable.css"
import nextArrow from "../images/nextArrow.png"

function CardTable() {

    return (
        <Container fluid className='p-2'>
            {/* <ListGroup horizontal>
                <ListGroup defaultActiveKey="#link1" className='w-100' >
                    <ListGroup.Item className='d-flex justify-content-between' >
                        <p className='m-0'>300</p>
                        <p className='m-0'>Juan</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex justify-content-between'>
                        <p className='m-0'>Tarea</p>
                        <p className='m-0'>Foto</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center'>DeadLine</ListGroup.Item>
                    <ListGroup.Item action href="#link1" className='text-center'>Seleccionar Carril</ListGroup.Item>
                </ListGroup>
                <ListGroup.Item variant="primary" className='py-5' >
                    <img style={{ width: '2rem', height: '2rem' }} src={nextArrow} alt='nextArrrow'></img>
                </ListGroup.Item>
            </ListGroup> */}
            {/* <Row>
                <Col xs={12} md={8} className='d-flex justify-content-between'>
                    <p className='m-0'>300</p>
                    <p className='m-0'>Juan</p>

                </Col>
                <Col xs={6} md={4} className='d-flex justify-content'>
                    <img style={{ width: '1rem', height: '1rem' }} src={nextArrow} alt='nextArrrow'></img>
                </Col>

            </Row> */}
            <Card className='w-100 h-25'>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Card>

        </Container>
    )
}

export default CardTable