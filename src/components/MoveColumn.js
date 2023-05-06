import React from 'react'
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { BsRecordCircleFill } from "react-icons/bs"

function MoveColumn({ title, tabCol1, tabCol2, dotColor, api }) {

    const handleCardMove = async (e) => {
        e.preventDefault();
        const values = {
            domain: localStorage.getItem('domain'),
            apikey: localStorage.getItem('apikey'),
            cardid: 12,
            columnid: 12,
            workflowid: 12,
        };

        // Funcion que manda la petición tipo POST para insertar la tarjeta
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
            console.log('Error al mover');
        }
        else {
            console.log('Todo chill');
        }
    }


    return (
        <div>
            <Form>
                <div key={`reverse-checkbox`} className="mb-3">
                    <Row className='d-flex align-items-center'>
                        {/* justify-content-end para kid */}
                        <Col xs={tabCol1} md={tabCol1} className='d-flex justify-content-end m-0 p-2'>
                            <BsRecordCircleFill color={dotColor} className='d-flex justify-content-center align-self-end m-1' size={15} />
                        </Col>
                        <Col xs={tabCol2} md={tabCol2} className='d-flex justify-content-start m-0 p-0'>
                            <h5 className='d-flex justify-content-start m-0 text-start'>{title}</h5>
                        </Col>
                        <Col xs={2} md={2} className='d-flex justify-content-center m-0 p-0'>
                            <Form.Check
                                reverse
                                name="group1"
                                type='checkbox'
                                id={`reverse-checkbox-1`}
                                onClick={() => handleCardMove()}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}

export default MoveColumn