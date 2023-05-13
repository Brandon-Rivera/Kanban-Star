import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { BsRecordCircleFill } from "react-icons/bs"

import ErrorModal from "./ErrorModal";

function MoveColumn({ column, tabCol1, tabCol2, dotColor, cardid, cardWid, api }) {

    const [checked, setChecked] = useState(false);
    // Modales de respuesta y error
    const [resModal, setResModal] = useState(false);
    const [errModal, setErrModal] = useState(false);

    const handleCardMove = async () => {

        const values = {
            domain: localStorage.getItem('domain'),
            apikey: localStorage.getItem('apikey'),
            cardid: cardid,
            columnid: column.id,
            workflowid: column.workflow_id,
        }; //208 y 101

        // Funcion que manda la petición tipo POST para mover la tarjeta
        const response = await fetch(`${api}/update/move`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

        const data = await response.json();

        if (data.error) {
            setErrModal(true);
            console.log('Error al mover');
        }
        else {
            setResModal(true);
            console.log('Todo chill');
        }
    }

    useEffect(() => {

        if(cardWid === column.id){
            setChecked(true);
        }

    }, [cardWid,column.id]);

    return (
        <>
            <div key={`reverse-checkbox`} className="mb-3">
                <Row className='d-flex align-items-center'>
                    {/* justify-content-end para kid */}
                    <Col xs={tabCol1} md={tabCol1} className='d-flex justify-content-end m-0 p-2'>
                        <BsRecordCircleFill color={dotColor} className='d-flex justify-content-center align-self-end m-1' size={15} />
                    </Col>
                    <Col xs={tabCol2} md={tabCol2} className='d-flex justify-content-start m-0 p-0'>
                        <h5 className='d-flex justify-content-start m-0 text-start'>{column.name}</h5>
                    </Col>
                    <Col xs={2} md={2} className='d-flex justify-content-center m-0 p-0'>
                        <Form.Check
                            reverse
                            name="group1"
                            type='radio'
                            id={`reverse-checkbox-1`}
                            checked={checked}
                            onChange={(e) => {setChecked(e.target.checked); handleCardMove();}}
                        />
                    </Col>
                </Row>
            </div>

            <ErrorModal show={resModal} title='Todo bien!' message='Se movio la tarjeta' onHide={() => setResModal(false)} backdrop="static" />
            <ErrorModal show={errModal} title='Ups!' message='Descripción del error' onHide={() => setErrModal(false)} backdrop="static" />
        </>
    )
}

export default MoveColumn