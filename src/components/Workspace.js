import React, { useEffect, useState } from 'react'
import './Workspace.css'
import { Modal, Button, Table } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

//Importación de componentes
import WorkCard from './WorkCard'


export function Workspace() {

    //Variable para obtener los datos del workspace en un hook
    const [dataBoard, setDataBoard] = useState({ data: [] });

    useEffect(() => {
        
        //Valores necesarios para la peticion get de workspace
        const values = {
            domain: localStorage.getItem('domain'),
            userid: localStorage.getItem('userid'),
            apikey: localStorage.getItem('apikey')
        }
        
        //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
        const getBoards = async () => {

            const response = await fetch(`http://localhost:3001/dashboard/`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(values)
            })
            const data = await response.json()
            setDataBoard(data)
        }

        //llamada a la funcion
        getBoards()
    }, [])

    return (
        <div>
            {/* <div>
                {<SettingsModal/>}
            </div> */}

            <div className="box">
                
                {
                    dataBoard.data.map(data => (
                        <div className='workspaceItem rounded'>
                            <h2 key={data.workspace_id}>{data.name}</h2>
                            <div className="row w-100">
                                {
                                    data.boards.map(boards => (
                                        <div className="col-md-4 mb-3" key={boards.board_id}>
                                            <WorkCard title={boards.name}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Workspace

