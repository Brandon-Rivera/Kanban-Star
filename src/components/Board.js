import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export const Board = () => {
    return (
        <>
            <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                    Cras justo odio
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}
