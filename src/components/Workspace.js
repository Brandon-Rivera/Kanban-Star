import React from 'react'
import WorkCard from './WorkCard'
import './Workspace.css'


const xd = [
    {
        id: 1,
        title: 'xd1'
    },
    {
        id: 2,
        title: 'xd2'
    },
    {
        id: 3,
        title: 'xd3'
    }
]

export function Workspace() {
  return (
    <div className="custom">
        <div className="row w-100">
            {
                xd.map(xd => (
                    <div className = "col-md-4 mb-3" key={xd.id}>
                        <WorkCard title={xd.title}/>
                    </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Workspace

/*
            <div className = "col-md-4 mb-2">
                <WorkCard/>
            </div> 
*/