// Se importan las librerías y componentes necesarios
import React, { useContext, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { ThemeContext } from '../Contexts/ThemeContext';
import './css/Cards.css'
import { useTranslation } from "react-i18next";
import CardMenu from './CardMenu';
import { DataContext } from '../Contexts/DataContext';

// Funcion que contiene el componente de las tarjetas
function Cards({ nCard, cardWid, duedate, dataWorkspace, workflowPos, idCard, cCard, api }) {

    //Vaiable para mostrar modal de menu de opciones
    const [modalShow, setModalShow] = useState(false);
    const [t] = useTranslation("global");
    const {theme} = useContext(ThemeContext)
    // Variable para guardar los detalles de una tarjeta
    const [cardDetails, setCardDetails] = useState({});
    const { updateDataC } = useContext(DataContext);

    // Petición para obtener los detalles de una tarjeta
    // Una vez que se obtienen los datos, se muestra el modal CardMenu
    const getCardDetails = async (cardID) => {
        const response = await fetch(`${api}/card`, {
            headers: {
                'Content-Type': 'application/json',
                'supra-access-token': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    cardid: cardID
                }
            )
        })
        const data = await response.json();
        setCardDetails(data);
        updateDataC(data.data);
        console.log(data.data);
        MenuClick();
    }

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

    return (
        <>
            <>
        <ListGroup as="ol">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
                    <div className="me-2">
                        <div className="fw-bold">{nCard}</div>
                        {duedate}
                    </div>
                    {/* Se obtienen los detalles de la tarjeta seleccionada */}
                    <Button onClick={() => getCardDetails(idCard)}>Menu</Button>
                </ListGroup.Item>
            </ListGroup>

            {/* Modales */}
            <CardMenu show={modalShow} title={t("cardMenu.title")} onHide={() => setModalShow(false)} dataWorkspace={dataWorkspace} workflowPos={workflowPos} idCard={idCard} cardName={nCard} columnCard={cCard} cardDetails={cardDetails} cardWid={cardWid} api={api}/>
            </>
        </>
    )
}

export default Cards