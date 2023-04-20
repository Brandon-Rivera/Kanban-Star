import React from 'react'
import "./Board.css"

import Workflow from './Workflow.js'

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { BiSearchAlt } from "react-icons/bi";

export const Board = () => {
    return (
        <>
            <ListGroup>
                    <ListGroup.Item className='title'>
                        <h4>Tablero 1</h4>
                        <InputGroup className="mb-6">
                            <Button variant="dark" className = "search">
                                <BiSearchAlt size={25} color={'white'}/>
                            </Button>
                            <Form.Control
                                className = "search"
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </ListGroup.Item>
        
            </ListGroup>

            <Workflow title={"Entregables"}/>
            
            
        </>
    )
}
