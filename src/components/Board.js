import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, ListGroup, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { BiSearchAlt } from "react-icons/bi";
import Workflow from './Workflow.js'
import "./css/Board.css"
import { useTranslation } from 'react-i18next';
import { DataContext } from '../Contexts/DataContext.js';

export const Board = ({ api }) => {
    
    // Estado que contiene los datos de Board
    const [t] = useTranslation("global");
    const { dataW, forceDataW } = useContext(DataContext);
    const [ownerTitle, setOwnerTitle] = useState(t("workspace.filter"));
    const [ownerID, setOwnerID] = useState(0);
    const cardOwners = JSON.parse(localStorage.getItem('owners'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("domain");
        localStorage.removeItem("userid");
        navigate("/");

    };

    if (cardOwners.mensaje === 'Token inválido') {
        handleLogout()
    }

    // Se refresca cada vez que se actualiza el estado de dataW
    useEffect(() => {
        if( dataW === undefined || dataW === null){
            forceDataW(api, localStorage.getItem('boardid'));
        }
        if (cardOwners.mensaje === 'Token inválido') {
            localStorage.removeItem("token");
        }

        if(localStorage.getItem("i18nextLng") === "en" || localStorage.getItem("i18nextLng") === "es"){
            setOwnerTitle(t("workspace.filter"));
        }
    }, [dataW, api, cardOwners.mensaje, forceDataW, t]);

    return (
        <>
            <ListGroup>
                <ListGroup.Item className='title'>
                    <h4>{t("workspace.board")}{localStorage.getItem('boardname')}</h4>
                    <InputGroup className="mb-6">
                        <Button className="search">
                            <BiSearchAlt size={25} color={'white'} />
                        </Button>
                        {/* Seccion para el filtro */}
                        <DropdownButton id="dropdown-basic-button" title={ownerTitle} className="d-flex justify-content-center w-100 m-2">
                            <Dropdown.Item key='0' onClick={() => { setOwnerTitle(t("workspace.filter")); setOwnerID(0); }} >{t("workspace.filter")}</Dropdown.Item>
                            {
                                cardOwners.data.map(data => (
                                    <Dropdown.Item key={data.user_id} onClick={() => { setOwnerTitle(data.username); setOwnerID(data.user_id); }} >{data.username}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    </InputGroup>
                </ListGroup.Item>
            </ListGroup>

            <Container fluid>
                {
                    dataW?.data.map(data => (
                        data.type === 0 || data.type === 1 ? <div className="cont border border-secondary rounded my-3 p-2 text-secondary">
                            <h4 className='cont text-center' key={data.id}>{data.name}</h4>
                            <h4 className='cont text-center bg-primary text-white rounded' key={data.lanes[0].id}>{data.lanes[0].name}</h4>
                            {
                                data.columns.map(columns => (
                                    columns.kids.length > 0 ? (
                                        <div>
                                            <h3 className="cont text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            {
                                                columns.kids.map(kids => (
                                                    <Workflow ownerID={ownerID} title={kids.name} col={kids} dataWorkspace={dataW} workflowPos={data.pos} api={api}></Workflow>
                                                ))
                                            }
                                        </div>

                                    ) : (
                                        <div>
                                            <h3 className="text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            <Workflow ownerID={ownerID} title={columns.name} col={columns} dataWorkspace={dataW} workflowPos={data.pos} api={api}></Workflow>
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    : []))
                }
            </Container>
        </>
    )
}