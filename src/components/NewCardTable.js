import React from 'react'
import { Container, ListGroup} from 'react-bootstrap';
import "./css/NewCardTable.css"
import nextArrow from "../images/nextArrow.png"

function NewCardTable({id, nCard, duedate}) {

    return (
        <Container fluid className='px-0 p-1' >
            <ListGroup defaultActiveKey="#link1" className='w-100'>
                <ListGroup.Item className='d-flex justify-content-between' >
                    <p className='m-0 fw-bold'>{id}</p>
                    <p className='m-0 fw-bold'>Juan</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between custom-container'>
                    <p className='m-0 fw-bold'>{nCard}</p>
                    <p className='m-0 '>Foto</p>
                </ListGroup.Item>
                <ListGroup.Item className='text-start'>
                    <p className='m-0 fw-bold'>Fecha Limite: {duedate}</p>
                </ListGroup.Item>
                <ListGroup.Item action href="#link1" className='text-center'>Seleccionar Flujo De Trabajo</ListGroup.Item>
                <ListGroup.Item action href="chivas.com" className='d-flex align-items-center justify-content-center' style={{ backgroundColor: "#42AD49" }}>
                    <img style={{ width: '2rem', height: '2rem' }} src={nextArrow} alt='nextArrrow'></img>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default NewCardTable