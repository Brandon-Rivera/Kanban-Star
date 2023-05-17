import React from 'react'
import { Card } from 'react-bootstrap';
import NewCardTable from './NewCardTable';
import "./css/NewColumnsTable.css"

function NewColumnsTable({ kids, nameCol, mycards }) {
    return (
        <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
            <Card.Header>{nameCol}</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
                <Card.Text>
                    {
                        kids.length > 0 ? (
                            kids.map(kids => (
                                kids.mycards.map(mycards => (
                                    <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} idOwner={mycards.owner_id} />
                                ))
                            ))
                        ) : (
                            mycards.map(mycards => (
                                <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} idOwner={mycards.owner_id}/>
                            ))

                        )
                    }
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default NewColumnsTable