import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

function Cards({ nCard, duedate }) {
    return (
        <ListGroup as="ol">
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
                <div className="me-2">
                    <div className="fw-bold">{nCard}</div>
                    {duedate}
                </div>
                <Button>Menu</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default Cards