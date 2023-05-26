import React, { useContext, useEffect } from 'react'
import { Container, ListGroup, Button, Form, InputGroup } from 'react-bootstrap';
import { BiSearchAlt } from "react-icons/bi";
import Workflow from './Workflow.js'
import "./css/Board.css"
import { DataContext } from '../Contexts/DataContext.js';

export const Board = ({ api }) => {
    
    // Estado que contiene los datos de Board
    const { dataW } = useContext(DataContext);

    // Se refresca cada vez que se actualiza el estado de dataW
    useEffect(() => {}, [dataW]);

    return (
        <>
            <ListGroup>
                <ListGroup.Item className='title'>
                    <h4>Tablero: {localStorage.getItem('boardname')}</h4>
                    <InputGroup className="mb-6">
                        <Button variant="dark" className="search">
                            <BiSearchAlt size={25} color={'white'} />
                        </Button>
                        {/* Seccion para el filtro */}
                        <Form.Control className="search" list="datalistOptions" aria-label="Example text with button addon" aria-describedby="basic-addon1" placeholder="Type to search..."/>
                        <datalist id="datalistOptions">
                            <option value="San Francisco"/>
                            <option value="New York"/>
                            <option value="Seattle"/>
                        </datalist>
                    </InputGroup>
                </ListGroup.Item>
            </ListGroup>

            <Container fluid>
                {
                    dataW?.data.map(data => (
                        <div className="cont border border-secondary rounded my-3 p-2 text-secondary">
                            <h4 className='cont text-center' key={data.id}>{data.name}</h4>
                            {
                                data.columns.map(columns => (
                                    columns.kids.length > 0 ? (
                                        <div>
                                            <h3 className="cont text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            {
                                                columns.kids.map(kids => (
                                                    <Workflow title={kids.name} col={kids} dataWorkspace={dataW} workflowPos={data.pos} api={api}></Workflow>
                                                ))
                                            }
                                        </div>

                                    ) : (
                                        <div>
                                            <h3 className="text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            <Workflow title={columns.name} col={columns} dataWorkspace={dataW} workflowPos={data.pos} api={api}></Workflow>
                                        </div>
                                    )
                                ))
                            }
                        </div>

                    ))
                }
            </Container>
        </>
    )
}