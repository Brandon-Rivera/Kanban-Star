import React from 'react'
import { Container, ListGroup, Row, Col, Button, Card, Badge } from 'react-bootstrap';

import "./css/CardTable.css"
import nextArrow from "../images/nextArrow.png"

function CardTable() {

    return (
        <Container fluid className='px-0 p-1' >
            <ListGroup defaultActiveKey="#link1" className='w-100'>
                <ListGroup.Item className='d-flex justify-content-between' >
                    <p className='m-0 fw-bold'>300</p>
                    <p className='m-0 fw-bold'>Juan</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between custom-container'>
                    <p className='m-0 fw-bold'>Tarea T5.HU6 - Recibir datos de las tarjeta desde la API</p>
                    <p className='m-0 '>Foto</p>
                </ListGroup.Item>
                <ListGroup.Item className='text-start'>
                    <p className='m-0 fw-bold'>Fecha Limite: 00/00/00</p>
                </ListGroup.Item>
                <ListGroup.Item action href="#link1" className='text-center'>Seleccionar Flujo De Trabajo</ListGroup.Item>
                <ListGroup.Item action href="chivas.com" className='d-flex align-items-center justify-content-center' style={{ backgroundColor: "#42AD49" }}>
                    <img style={{ width: '2rem', height: '2rem' }} src={nextArrow} alt='nextArrrow'></img>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default CardTable