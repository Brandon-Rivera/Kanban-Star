import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { BsRecordCircleFill } from "react-icons/bs"

import SuccessCardModal from "./SuccessCardModal";
import ErrorCardModal from "./ErrorCardModal";
import { DataContext } from "../Contexts/DataContext.js";
import getDeadline from '../utils/getDeadline';

function MoveColumn({ column, tabCol1, tabCol2, dotColor, cardid, cardWid, api, wPos }) {

    const [checked, setChecked] = useState(false);
    const [t] = useTranslation("global");
    // Modales de respuesta y error
    const [resModal, setResModal] = useState(false);
    const [errModal, setErrModal] = useState(false);
    const [errModal2, setErrModal2] = useState(false);
    const [errModal3, setErrModal3] = useState(false);

    const { moveCard, dataC, updateDataC, dataW } = useContext(DataContext);
    const [oldCard, setOldCard] = useState(null);
    const [newCard, setNewCard] = useState(null);
    const [cardResponse, setCardResponse] = useState(null);

    // Constante que contiene laneId
    const laneId = dataW?.data[wPos]?.lanes[0]?.id;

    const handleCardMove = async () => {

        const values = {
            cardid: cardid,
            columnid: column.id,
            workflowid: column.workflow_id,
            laneid: laneId,
        }; //208 y 101

        // Funcion que manda la petición tipo POST para mover la tarjeta
        const response = await fetch(`${api}/update/move`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'supra-access-token': localStorage.getItem('token')
                },
                body: JSON.stringify(values)
            });

        const data = await response.json();
        setCardResponse(data);

        if (data.error) {
            if(data.error.code === 'TI02'){
                setErrModal3(true);
            }
            if (data.error.message === `The card with id ${cardid} cannot be moved because it is blocked.`) {
                setErrModal(true);
            }
            if (data.error.message === `The card with id ${cardid} cannot be moved because some of the exit criteria for the column with id ${cardWid} on the board with id ${localStorage.getItem('boardid')} are not checked off.`) {
                setErrModal2(true);
            }

        }
        else {
            setOldCard({
                id: dataC?.card_id,
                workflow_id: dataC?.workflow_id,
                column_id: dataC?.column_id
            });
            setNewCard({
                id: data.data[0].card_id,
                name: data.data[0].title,
                description: data.data[0].description,
                owner_id: data.data[0].owner_user_id,
                duedate: getDeadline(data.data[0].deadline),
                workflow_id: data.data[0].workflow_id,
                column_id: data.data[0].column_id,
                pos: null,
            })
            setResModal(true);
        }
    }

    const handleLocalMove = () => {
        moveCard(oldCard, newCard);
        updateDataC(cardResponse?.data[0]);
    }

    useEffect(() => {

        if (cardWid === column.id) {
            setChecked(true);
        }

    }, [cardWid, column.id]);

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
                            onChange={(e) => { setChecked(e.target.checked); handleCardMove(); }}
                        />
                    </Col>
                </Row>
            </div>

            <SuccessCardModal
                show={resModal}
                onHide={() => setResModal(false)}
                onConfirm={handleLocalMove}
                title={t("move.title-res")}
                message={t("move.message-res")}
                button={t("move.button-close")} />
            <ErrorCardModal
                show={errModal}
                onHide={() => setErrModal(false)}
                title={t("move.title-err")}
                message={t("move.message-block")}
                button={t("move.button-close")} />
            <ErrorCardModal
                show={errModal2}
                onHide={() => setErrModal2(false)}
                title={t("move.title-err")}
                message={t("move.message-ac")}
                button={t("move.button-close")} />
            <ErrorCardModal
                show={errModal3}
                onHide={() => setErrModal3(false)}
                title={t("move.title-err")}
                message={t("move.message-time")}
                button={t("move.button-close")} />

        </>
    )
}

export default MoveColumn