import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import MoveColumn from './MoveColumn';

function MoveCardModal({ show, onHide, dataWorkspace, workflowPos }) {

    const [wPos, setWPos] = useState(0);

    useEffect(() => {
        setWPos(workflowPos)
    }, [workflowPos])

    return (
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header className='bg-success'>
                <Modal.Title className='fw-bold text-white'>Selecciona carril</Modal.Title><CloseButton onClick={onHide} />
            </Modal.Header>
            <Modal.Body className='p-1'>

                {
                    <>
                        {
                            dataWorkspace.data[wPos].columns.map(columns => (
                                columns.kids.length > 0 ? (
                                    <>
                                        <MoveColumn title={columns.name} tabCol1={2} tabCol2={8} />
                                        {
                                            columns.kids.map(kids => (
                                                <MoveColumn title={kids.name} tabCol1={4} tabCol2={6}/>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <>
                                        <MoveColumn title={columns.name} tabCol1={2} tabCol2={8}/>
                                    </>
                                )
                            ))
                        }
                    </>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveCardModal