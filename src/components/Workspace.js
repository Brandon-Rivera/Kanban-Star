import React, { useEffect, useState } from 'react'
import './Workspace.css'

//Importación de componentes
import WorkCard from './WorkCard'


export function Workspace( {api} ) {

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

            const response = await fetch(`${api}/dashboard`, {
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
    }, [api])

    const colorRandom = () => {
        const color =[("#E4186A"), ("#F08830"), ("#2665BB"), ("#42AD49")]
        return color[Math.floor(Math.random()*color.length)]
    }
    
    return (
        <div>
            <div className="box">
                {
                    dataBoard.data.map(data => (
                        <div className='workspaceItem rounded' style={{backgroundColor: colorRandom()}}>
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

