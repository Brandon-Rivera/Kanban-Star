import React, { useContext, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { ThemeContext } from '../Contexts/ThemeContext';
import './css/Cards.css'
import ViewCardModal from './ViewCardModal';

import { useTranslation } from "react-i18next";

import CardMenu from './CardMenu';

function Cards({ nCard, duedate, dataWorkspace, workflowPos, idCard, cCard, api }) {

    //Vaiable para mostrar modal de menu de opciones
    const [modalShow, setModalShow] = useState(false);

    const [t] = useTranslation("global");
    const [viewModalShow, setViewModalShow] = useState(false);
    const [cardDetails, setCardDetails] = useState({});
    const {theme} = useContext(ThemeContext)

    const MenuClick = () => {
        buttonsTheme()
        setModalShow(true)
    }

    const buttonsTheme = () => {
		if(theme === "dark") {
			return theme;
		}
		else{
			return "primary";
		}
	}

    const getCardDetails = async (cardID) => {
        const response = await fetch(`${api}/card`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    cardid: cardID,
                    domain: localStorage.getItem('domain'),
                    apikey: localStorage.getItem('apikey')
                }
            )
        })
        const data = await response.json();
        setCardDetails(data);
        setViewModalShow(true);
    }

    return (
        <>
            <>
        <ListGroup as="ol">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
                    <div className="me-2">
                        <div className="fw-bold">{nCard}</div>
                        {duedate}
                    </div>
                    <Button onClick={() => MenuClick()}>Menu</Button>
                </ListGroup.Item>
            </ListGroup>

            {/* Modales */}
            <CardMenu show={modalShow} title={t("cardMenu.title")} onHide={() => setModalShow(false)} dataWorkspace={dataWorkspace} workflowPos={workflowPos} api={api}/>
        </>
        <ViewCardModal show={viewModalShow}
            onHide={() => setViewModalShow(false)}
            cardColumn={cCard}
            cardDetails={cardDetails}
        />
        </>
    )
}

export default Cards