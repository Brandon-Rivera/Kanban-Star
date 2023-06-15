import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import MoveColumn from './MoveColumn';
import Form from 'react-bootstrap/Form';
import MoveColumnCheckless from './MoveColumnCheckless';
import { useTranslation } from 'react-i18next';

function MoveCardModal({ show, onHide, dataWorkspace, workflowPos, cardid, cardWid, api }) {

    const [t] = useTranslation("global");
    const [wPos, setWPos] = useState(0);
    const [move, setMove] = useState(false);
    const colors = ["FFFFFF","#545454", "#2665BB", "#F08830", "#42AD49", "5E17EB"]

    useEffect(() => {
        setWPos(workflowPos)
        setMove(false);
    }, [workflowPos, move])

    return (
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header className='bg-success'>
                <Modal.Title className='fw-bold text-white'>{t('move.title-modal')}</Modal.Title><CloseButton onClick={onHide} />
            </Modal.Header>
            <Modal.Body className='p-1'>

                {
                    <Form>
                        {
                            dataWorkspace.data[wPos].columns.map(columns => (
                                columns.kids.length > 0 ? (
                                    <>
                                        <MoveColumnCheckless column={columns} tabCol1={2} tabCol2={8} dotColor={colors[columns.sec]} cardid={cardid} cardWid={cardWid} api={api}/>
                                        {
                                            columns.kids.map(kids => (
                                                <MoveColumn column={kids} tabCol1={4} tabCol2={6} dotColor={colors[columns.sec]} cardid={cardid} cardWid={cardWid} api={api} wPos={wPos}/>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <>
                                        <MoveColumn column={columns} tabCol1={2} tabCol2={8} dotColor={colors[columns.sec]} cardid={cardid} cardWid={cardWid} api={api} wPos={wPos}/>
                                    </>
                                )
                            ))
                        }
                    </Form>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>{t('updatecard.modal-accept')}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveCardModal