import React, { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'

import MenuTarjetas from './MenuTarjetas';

function Cards({ nCard, duedate }) {

    //Vaiable para mostrar modal de menu de opciones
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <ListGroup as="ol">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
                    <div className="me-2">
                        <div className="fw-bold">{nCard}</div>
                        {duedate}
                    </div>
                    <Button onClick={() => setModalShow(true)}>Menu</Button>
                </ListGroup.Item>
            </ListGroup>

            {/* Modales */}
            <MenuTarjetas show={modalShow} title='¿Qué gustas hacer?' onHide={() => setModalShow(false)} />
        </>
    )
}

export default Cards