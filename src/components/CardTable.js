import React from 'react'
import { Container, ListGroup, } from 'react-bootstrap';

import "./css/CardTable.css"
import nextArrow from "../images/nextArrow.png"

function CardTable() {

    return (
        <Container fluid className='p-2'>
            <ListGroup horizontal>
                <ListGroup defaultActiveKey="#link1" className='w-100'>
                    <ListGroup.Item className='d-flex justify-content-between'>
                        <p className='m-0'>300</p>
                        <p className='m-0'>Juan</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex justify-content-between'>
                        <p className='m-0'>Tarea</p>
                        <p className='m-0'>Foto</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center'>Planificación 2</ListGroup.Item>
                    <ListGroup.Item action href="#link1" className='text-center'>Seleccionar Carril</ListGroup.Item>
                </ListGroup>
                <ListGroup.Item variant="primary" className='py-5'>
                    <img style={{ width: '50px', height: '50px' }} src={nextArrow} alt='nextArrrow'></img>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default CardTable