import React from 'react'
import { Card, Button } from 'react-bootstrap';
import NewCardTable from './NewCardTable';
import plusIcon from "../images/plus.png";
import "./css/NewColumnsTable.css"

function NewColumnsTable({ kids, nameCol, mycards, index, indeK, onCardMove, color}) {

    return (
        <Card className="text-light w-100 p-0" style={{ backgroundColor: color }} >
            <Card.Header>{nameCol}</Card.Header>
            <Card.Body style={{ backgroundColor: '#FFFAFA' }}>
                <Card.Text>
                    {
                        kids.length > 0 ? (
                            kids.map(kids => (
                                kids.mycards.map(mycards => (
                                    <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} idOwner={mycards.owner_id} Idworkflow={mycards.workflow_id} index={index} indeK={indeK} onCardMove={onCardMove}/>
                                ))
                            ))
                        ) : (
                            mycards.map(mycards => (
                                <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} idOwner={mycards.owner_id} Idworkflow={mycards.workflow_id} index={index} indeK={indeK} onCardMove={onCardMove} />
                            ))
                        )
                    }
                </Card.Text>
                <Button className="btn-danger rounded-circle p-0 plusicon"><img width="50" src={plusIcon} alt='nextArrrow' /></Button>
            </Card.Body>
        </Card>
    )
}

export default NewColumnsTable