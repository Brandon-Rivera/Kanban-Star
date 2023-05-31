import React, { useRef, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewColumnsTable from './NewColumnsTable';
import nextArr from "../images/Siguiente.png";

import { useTranslation } from "react-i18next";
import SuccessCardModal from "./SuccessCardModal";
import ErrorCardModal from "./ErrorCardModal";

import "./css/NewBoardTable.css";

export function NewBoardTable({ nameWF, dataWorkspace, api }) {
    const scrollingWrapperRef = useRef(null);
    const [resultNWF, setResultNWF] = useState('');
    const [ram, setRam] = useState({});
    const [t] = useTranslation("global");
    const [resModal, setResModal] = useState(false);
    const [errModal, setErrModal] = useState(false);
    const [errModal2, setErrModal2] = useState(false);
    const [errModal3, setErrModal3] = useState(false);

    useEffect(() => {
        const res = (dataWorkspace.data.find(data => data.name === nameWF))
        setResultNWF(res);
    }, [nameWF, dataWorkspace]);

    const handleNext = () => {
        scrollingWrapperRef.current.scrollLeft += scrollingWrapperRef.current.offsetWidth - 31;
    };

    const handlePrev = () => {
        scrollingWrapperRef.current.scrollLeft -= scrollingWrapperRef.current.offsetWidth - 31;
    };

    const handleCardMove = (cardId, index, indeK, Idworkflow) => {
        let columnId = 0;
        if (index < (resultNWF.columns.length - 1)) {
            if (resultNWF.columns[index].kids.length > 0) {
                const res0 = resultNWF.columns[index].kids[indeK].mycards.filter(item => item.id !== cardId);
                const result1 = resultNWF.columns[index].kids[indeK].mycards.find(item => item.id === cardId); // encuentro la card a pegar ctrl-x
                resultNWF.columns[index].kids[indeK].mycards = res0;                                            //Nuevo valores de mycards
                if (result1) {
                    if (resultNWF.columns[index].kids[indeK + 1]) {
                        const newMycards = [...resultNWF.columns[index].kids[indeK + 1].mycards];
                        newMycards.unshift(result1);
                        resultNWF.columns[index].kids[indeK + 1].mycards = newMycards;
                        setRam(newMycards);
                        columnId = (resultNWF.columns[index].kids[indeK + 1].id);
                    }
                    else {
                        if (resultNWF.columns[index + 1].kids.length > 0) {                                       //si la siguiente columna tiene kids;
                            const newMycards = [...resultNWF.columns[index + 1].kids[0].mycards];
                            newMycards.unshift(result1);
                            resultNWF.columns[index + 1].kids[0].mycards = newMycards;
                            setRam(newMycards);
                            columnId = (resultNWF.columns[index].kids[0].id);
                        }
                        else {
                            const newMycards = [...resultNWF.columns[index + 1].mycards];
                            newMycards.unshift(result1);
                            resultNWF.columns[index + 1].mycards = newMycards;
                            setRam(newMycards);
                            columnId = (resultNWF.columns[index + 1].id);
                        }
                    }
                }
            }
            else {
                const res0 = resultNWF.columns[index].mycards.filter(item => item.id !== cardId); //elimino la card ctrl-x
                const result1 = resultNWF.columns[index].mycards.find(item => item.id === cardId); // encuentro la card a pegar ctrl-x
                resultNWF.columns[index].mycards = res0;                                           //Nuevo valores de mycards
                if (result1) {
                    if (resultNWF.columns[index + 1].kids.length > 0) {                                       //si la columna tiene kids
                        const newMycards = [...resultNWF.columns[index + 1].kids[0].mycards];
                        newMycards.unshift(result1);
                        resultNWF.columns[index + 1].kids[0].mycards = newMycards;
                        setRam(newMycards);
                        columnId = (resultNWF.columns[index + 1].kids[0].id);

                    }
                    else {
                        const newMycards = [...resultNWF.columns[index + 1].mycards];
                        newMycards.unshift(result1);
                        resultNWF.columns[index + 1].mycards = newMycards;
                        setRam(newMycards);
                        columnId = (resultNWF.columns[index + 1].id);
                    }
                }
            }
            handleCardMoveAPI(cardId, columnId, Idworkflow);
        }
    }

    // Mandar petición de Actualizar
    const handleCardMoveAPI = async (cardId, columnId, Idworkflow) => {

        const values = {
            cardid: cardId,
            columnid: columnId,
            workflowid: Idworkflow,
        };

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

        if (data.error) {

            console.log('ram', ram);

            if (data.error.message === `The card with id ${cardId} cannot be moved because it is blocked.`) {
                setErrModal(true);
            }
            if (data.error.message === `The card with id ${cardId} cannot be moved because some of the exit criteria for the column with id ${Idworkflow} on the board with id ${localStorage.getItem('boardid')} are not checked off.`) {
                setErrModal2(true);
            }

        }
        else {
            setResModal(true);
        }
    }


    return (
        <Container fluid>
            <div className="d-flex justify-content-between my-2 fixed-bottom">
                <Button className="btn-info rounded-circle p-0 pre-btn" onClick={handlePrev}><img width="50" src={nextArr} alt='nextArrrow' /></Button>
                <Button className="btn-info rounded-circle p-0 nxt-btn" onClick={handleNext}><img width="50" src={nextArr} alt='nextArrrow' /></Button>
            </div>
            {
                resultNWF ? [resultNWF].map(data => (
                    <div key={data.id}>
                        <div className="scrolling-wrapper row flex-row flex-nowrap" ref={scrollingWrapperRef}>
                            {
                                data.columns.map((columns, index) => (
                                    columns.kids.length > 0 ? (
                                        columns.kids.map((kids, indeK) => (
                                            <div className="col-11 col-md-3">
                                                <NewColumnsTable key={data.id} kids={kids} nameCol={kids.name} mycards={kids.mycards} index={index} indeK={indeK} onCardMove={handleCardMove} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-11 col-md-3">
                                            <NewColumnsTable key={data.id} kids={[]} mycards={columns.mycards} nameCol={columns.name} index={index} indeK={-1} onCardMove={handleCardMove} />
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    </div>
                )) : []
            }
            <SuccessCardModal
                show={resModal}
                onHide={() => setResModal(false)}
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
                message={t("move.message-err")}
                button={t("move.button-close")} />
        </Container>
    );
}

export default NewBoardTable;
