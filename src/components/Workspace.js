import React, { useEffect, useState } from 'react'
import WorkCard from './WorkCard'
import './Workspace.css'

export function Workspace() {

    const [dataBoard, setDataBoard] = useState({ data: []});

    const values = {
        domain: "university6y",
        userid: 7,
        apikey: localStorage.getItem('apikey')
    }

    const getBoards = async () => {

        const response = await fetch(`http://localhost:3001/dashboard/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values)
        })
        const data = await response.json()
        console.log('data2', data)
        setDataBoard(data)
    }

    useEffect(() => {
        getBoards()
    }, [])

    console.log('databoard', dataBoard)

    return (
        <div className="box">
            {
                dataBoard.data.map(data => (
                    <div className='workspaceItem rounded'>
                        <h2 key={data.workspace_id}>{data.name}</h2>
                        <div className="row w-100">
                        {
                                data.boards.map(boards => (
                                <div className="col-md-4 mb-3" key={boards.board_id}>
                                    <WorkCard title={boards.name} />
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

