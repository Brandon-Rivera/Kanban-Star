import React from 'react'
import { Card } from 'react-bootstrap';
import NewCardTable from './NewCardTable';
import "./css/NewColumnsTable.css"

function NewColumnsTable({ kids, nameCol, mycards, index , onCardMove}) {
    // const [rol, setRol] = useState('');

    // const result1 = mycards.filter(item => item.id !== 55);
    // console.log(result1);
    // mycards = result1;
    // const handleCardMove = (cardId) => {
    //     const res0 = mycards.filter(item => item.id !== cardId); //elimino la card
    //     const result1 = mycards.find(item => item.id === cardId); // encuentro la card a pegar
    //     mycards = res0;
    //     if (result1) {
    //         const ram = mycards.unshift(result1); // agrego la card al array siguiente
    //         console.log(ram);
    //     }
    //     console.log("ROL", rol);
    // }

    // const result0 = nameWF.columns.mycards.filter(item => item.id !== 55); // elimino la card
    // nameWF.columns.mycards = result0;
    // const result1 = nameWF.columns.mycards.find(item => item.id === 55); // encuentro la card a pegar
    // if (result1) {
    //     const ram = nameWF.columns[0 + 1].mycards.unshift(result1); // agrego la card al array siguiente
    //     console.log(ram);
    // }


    return (
        <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
            <Card.Header>{nameCol}</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
                <Card.Text>
                    {
                        kids.length > 0 ? (
                            kids.map(kids => (
                                kids.mycards.map(mycards => (
                                    <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} idOwner={mycards.owner_id} index={index} />
                                ))
                            ))
                        ) : (
                            mycards.map(mycards => (
                                <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} idOwner={mycards.owner_id} index={index} onCardMove={onCardMove} />
                            ))
                        )
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NewColumnsTable