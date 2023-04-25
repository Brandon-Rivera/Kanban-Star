import React, { useState } from 'react'
import "./Board.css"

import Workflow from './Workflow.js'
import InsertCardModal from './InsertCardModal';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { BiSearchAlt } from "react-icons/bi";
import { ImPlus } from "react-icons/im";

export const Board = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <ListGroup>
                <ListGroup.Item className='title' active>
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

            <Button
                onClick={() => setModalShow(true)}
                variant='flat'
                className='position-absolute bottom-0 end-0'
                
            >
                <ImPlus size={40} color={'white'}/>
            </Button>

            <InsertCardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}