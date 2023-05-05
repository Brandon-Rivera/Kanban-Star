import React, { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import ViewCardModal from './ViewCardModal';

function Cards({ nCard, duedate, idCard, cCard }) {
    const [viewModalShow, setViewModalShow] = useState(false);
    const [cardDetails, setCardDetails] = useState({});

    const getCardDetails = async (cardID) => {
        const response = await fetch('http://localhost:3001/card', {
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
        <ListGroup as="ol">
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
                <div className="me-2">
                    <div className="fw-bold">{nCard}</div>
                    {duedate}
                </div>
                <Button>Menu</Button>
            </ListGroup.Item>
        </ListGroup>
        <ViewCardModal 
            show={viewModalShow}
            onHide={() => setViewModalShow(false)}
            cardColumn={cCard}
            cardDetails={cardDetails}
        />
        </>
    )
}

export default Cards