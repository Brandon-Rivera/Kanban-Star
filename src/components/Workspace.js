import React, { useEffect, useState } from 'react'
import WorkCard from './WorkCard'
import './Workspace.css'

// const data = [
//     {
//         workspace_id: 2,
//         type: "1",
//         is_archived: "0",
//         name: "Training",
//         boards: [
//             {
//                 board_id: 4,
//                 name: "LCRC"
//             },
//             {
//                 board_id: 7,
//                 name: "Alejandro Hidalgo Badillo"
//             },
//             {
//                 board_id: 10,
//                 name: "Emmanuel"
//             },
//             {
//                 board_id: 19,
//                 name: "Equipo 2"
//             }
//         ]
//     },
//     {
//         workspace_id: 3,
//         type: "1",
//         is_archived: "0",
//         name: "Training2",
//         boards: [
//             {
//                 board_id: 5,
//                 name: "LCRC2"
//             },
//             {
//                 board_id: 8,
//                 name: "Alejandro Hidalgo Badillo2"
//             },
//             {
//                 board_id: 11,
//                 name: "Emmanuel2"
//             },
//             {
//                 board_id: 18,
//                 name: "Equipo 3"
//             }
//         ]
//     }
// ]

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
        console.log('data', data)
        setDataBoard(data)
    }

    useEffect(() => {
        getBoards()
    }, [dataBoard])

    console.log('databoard', dataBoard)
    console.log('databoard.data[0].name', dataBoard.data[0].name)

    return (
        <div className="box">
            {
                Array.isArray(dataBoard) && dataBoard.data.map(dataBoard => (
                    <div className='workspaceItem rounded'>
                        <h2 key={dataBoard.data.workspace_id}>{dataBoard.data.name}</h2>
                        {/* <div className="row w-100">
                            {
                                dataBoard.data[0].board.map(board => (
                                    <div className="col-md-4 mb-3" key={board.board_id}>
                                        <WorkCard title={board.name} />
                                    </div>
                                ))
                            }
                        </div> */}
                    </div>
                ))
            }
        </div>

    )
}

export default Workspace

/*
    <div className="custom">
        {
        data.map(data => (
            <h2 key={data.workspace_id}>
                {data.name}
            </h2>
        ))
        }
        <div className="row w-100">
            {
                data[0].boards.map(board => (
                    <div className = "col-md-4 mb-3" key={board.board_id}>
                        <WorkCard title={board.name}/>
                    </div> 
                ))
            }
        </div>
    </div>
*/

