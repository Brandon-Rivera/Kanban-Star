import React, { useState, useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import nextArrow from "../images/nextArrow.png"
import WFace from "../images/blank-face.jpeg"
import "./css/NewCardTable.css"

function NewCardTable({ id, nCard, duedate, idOwner, index, onCardMove }) {
    const [own, setOwn] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const [animate, setAnimate] = useState(false);

    const handleButtonClick = (cardId, cardIndex) => {
        setAnimate(true);
        onCardMove(cardId, cardIndex); // Pasa el ID de la tarjeta y el índice a onCardMove
    };

    useEffect(() => {
        const ownersjs = JSON.parse(localStorage.getItem('owners'));
        setOwn(ownersjs.data.find(data => data.user_id === idOwner));
    }, [idOwner]);


    return (
        <Container fluid className='px-0 p-1' >
            <ListGroup defaultActiveKey="#link1" className={`animated-element ${animate ? 'animate' : ''}`}>
                <ListGroup.Item className='d-flex justify-content-between' >
                    <p className='m-0 fw-bold'>{id}</p>
                    <p className='m-0 fw-bold'>{index}</p>
                    <p className='m-0 fw-bold'>{own ? own.realname : "Sin Asignar"}</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between custom-container'>
                    <p className='m-0 fw-bold'>{nCard}</p>
                    <img src={own ? (own.avatar == null ? WFace : own.avatar) : WFace} className="img-thumbnail rounded-circle border-0" alt="Foto" />
                </ListGroup.Item>
                <ListGroup.Item className='text-start'>
                    <p className='m-0 fw-bold'>Fecha Limite: <span className='fw-normal'>{duedate ? duedate : "Sin Fecha"}</span></p>
                </ListGroup.Item>
                <ListGroup.Item action href="#link1" className='text-center'>Seleccionar Flujo De Trabajo</ListGroup.Item>
                <ListGroup.Item action href="#link2" className='d-flex align-items-center justify-content-center' onClick={() => handleButtonClick(id, index)} style={{ backgroundColor: "#42AD49" }}>
                    <img style={{ width: '2rem', height: '2rem' }} src={nextArrow} alt='nextArrrow'></img>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default NewCardTable