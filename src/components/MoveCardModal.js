import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import MoveColumn from './MoveColumn';

function MoveCardModal({ show, onHide, dataWorkspace, workflowPos, api }) {

    const [wPos, setWPos] = useState(0);
    const colors = ["FFFFFF","#545454", "#2665BB", "#F08830", "#42AD49", "5E17EB"]

    useEffect(() => {
        setWPos(workflowPos)
    }, [workflowPos])

    return (
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header className='bg-success'>
                <Modal.Title className='fw-bold text-white'>Selecciona columna</Modal.Title><CloseButton onClick={onHide} />
            </Modal.Header>
            <Modal.Body className='p-1'>

                {
                    <>
                        {
                            dataWorkspace.data[wPos].columns.map(columns => (
                                columns.kids.length > 0 ? (
                                    <>
                                        <MoveColumn title={columns.name} tabCol1={2} tabCol2={8} dotColor={colors[columns.sec]} api={api}/>
                                        {
                                            columns.kids.map(kids => (
                                                <MoveColumn title={kids.name} tabCol1={4} tabCol2={6} dotColor={colors[columns.sec]} api={api}/>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <>
                                        <MoveColumn title={columns.name} tabCol1={2} tabCol2={8} dotColor={colors[columns.sec]} api={api}/>
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