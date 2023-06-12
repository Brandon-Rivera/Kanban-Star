import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './css/Workspace.css'
import WorkCard from './WorkCard'
import Cookies from 'js-cookie';

export function Workspace({ api }) {

    const [dataBoard, setDataBoard] = useState({ data: [] }); //Variable para obtener los datos del workspace en un hook
    const navigate = useNavigate();

    useEffect(() => {

        //Valores necesarios para la peticion get
        const values = {
            userid: Cookies.get('userid')
        }

        //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
        const getBoards = async () => {

            const response = await fetch(`${api}/dashboard`, {
                headers: {
                    'Content-Type': 'application/json',
                    'supra-access-token': Cookies.get('token')
                },
                method: 'POST',
                body: JSON.stringify(values)
            })
            const data = await response.json()

            if (data.mensaje === 'Token inválido') {
                Cookies.remove("token");
                Cookies.remove("domain");
                Cookies.remove("userid");
                Cookies.remove("boardid");
                Cookies.remove("boardname");
                navigate("/");
            }

            setDataBoard(data)
        }

        getBoards()
    }, [api, navigate])

    //Función que ayuda a dar color random al background del tablero
    const color = (() => {
        const colors = ['#42AD49', '#E4186A', '#2665BB', '#F08830'];
        let index = 0;
        return () => {
            const color = colors[index];
            index = (index + 1) % colors.length;
            return color;
        };
    })();

    return (
        <div className="box">
            {
                dataBoard.data.map(data => (
                    <div className="m-2 rounded workspaceItem" style={{ backgroundColor: color() }}>
                        <h2 className='text-center text-light' key={data.workspace_id}>{data.name}</h2>

                        <div className="row w-100">
                            {
                                data.boards.map(boards => (
                                    <div className="col-md-4 mb-3" key={boards.board_id}>
                                        <WorkCard title={boards.name} id={boards.board_id} api={api} />
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default Workspace

