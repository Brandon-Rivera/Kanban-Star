import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { BiSearchAlt } from "react-icons/bi";
import Workflow from './Workflow.js'
import "./css/Board.css"

export const Board = ({ api }) => {

    //Variable para obtener los datos del workspace en un hook
    const [dataWorkspace, setDataWorkspace] = useState({ data: [] });
    const [ownerTitle, setOwnerTitle] = useState('Todas las cartas');
    const [ownerID, setOwnerID] = useState(0);
    const cardOwners = JSON.parse(localStorage.getItem('owners'));

    useEffect(() => {

        //Valores necesarios para la peticion get de workspace
        const values = {
            boardid: localStorage.getItem('boardid')
        }

        //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
        const getWorkSpace = async () => {

            const response = await fetch(`${api}/board`, {
                headers: {
                    'Content-Type': 'application/json',
                    'supra-access-token': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify(values)
            })
            const data = await response.json()
            setDataWorkspace(data)
        }


        //llamada a la funcion
        getWorkSpace()
    }, [api])

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
                        <DropdownButton variant="info" id="dropdown-basic-button" title={ownerTitle} className="d-flex justify-content-center w-100 m-2">
                        <Dropdown.Item key='0' onClick={() => {setOwnerTitle('Todas las cartas'); setOwnerID(0);}} >Todas las cartas</Dropdown.Item>
                            {
                                cardOwners.data.map(data => (
                                    <Dropdown.Item key={data.user_id} onClick={() => {setOwnerTitle(data.username); setOwnerID(data.user_id);}} >{data.username}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                </InputGroup>
            </ListGroup.Item>
        </ListGroup >

            <Container fluid>
                {
                    dataWorkspace.data.map(data => (
                        <div className="cont border border-secondary rounded my-3 p-2 text-secondary">
                            <h4 className='cont text-center' key={data.id}>{data.name}</h4>
                            {
                                data.columns.map(columns => (
                                    columns.kids.length > 0 ? (
                                        <div>
                                            <h3 className="cont text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            {
                                                columns.kids.map(kids => (
                                                    <Workflow ownerID={ownerID} title={kids.name} col={kids} dataWorkspace={dataWorkspace} workflowPos={data.pos} api={api}></Workflow>
                                                ))
                                            }
                                        </div>

                                    ) : (
                                        <div>
                                            <h3 className="text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            <Workflow ownerID={ownerID} title={columns.name} col={columns} dataWorkspace={dataWorkspace} workflowPos={data.pos} api={api}></Workflow>
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