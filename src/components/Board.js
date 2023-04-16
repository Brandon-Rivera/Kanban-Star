import React from 'react'
import "./Board.css"
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Board = () => {
    return (
        <>
            <ListGroup>
                <ListGroup.Item className='title' active>
                    <h4>Tablero 1</h4>
                    <InputGroup className="mb-3">
                        <Button variant="dark" id="button-addon1">
                            Button
                        </Button>
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}
