import React, { useState, useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import "./css/NewCardTable.css"
import nextArrow from "../images/nextArrow.png"
import WFace from "../images/blank-face.jpeg"

function NewCardTable({ id, nCard, duedate, idOwner }) {
    const [own, setOwn] = useState('');

    useEffect(() => {
        const ownersjs = JSON.parse(localStorage.getItem('owners'));
        setOwn(ownersjs.data.find(data => data.user_id === idOwner));
    }, [idOwner]);
    //falta validar img
    return (
        <Container fluid className='px-0 p-1' >
            <ListGroup defaultActiveKey="#link1" className='w-100'>
                <ListGroup.Item className='d-flex justify-content-between' >
                    <p className='m-0 fw-bold'>{id}</p>
                    <p className='m-0 fw-bold'>{own ? own.realname : ''}</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between custom-container'>
                    <p className='m-0 fw-bold'>{nCard}</p>
                    <img src={own ? own.avatar : WFace} className="img-thumbnail rounded-circle border-0" alt="Foto"/>
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