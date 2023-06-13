import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import NewCardTable from './NewCardTable';
import plusIcon from "../images/plus.png";
import InsertCardModal from './InsertCardModal';

//Función que pinta todo los componentes dentro de una columna
function NewColumnsTable({ kids, nameCol, idCol, idWork, cols, mycards, index, indeK, dataWorkspace, workflowPos, api, color}) {
    // Hook para mostrar el modal de insertar tarjeta
    const [showInsertCard, setShowInsertCard] = useState(false)

    //Función que establece los elementos de la columna,  verifica si es padre o tiene kids para desplegar las tarjetas
    //Se manda al componente NewCardTable los datos que debe contener las tarjetas
    //Al final de la columna hay un botón para agregar más tarjetas
    //El insertcardmodal ayuda a aparecer un modal con las distintas opciones para la tarjeta
    return (
        <>
        <Card className="text-light w-100 p-0" style={{ backgroundColor: color }} >
            <Card.Header>{nameCol}</Card.Header>
            <Card.Body style={{ backgroundColor: '#ffffe0' }}>
                <Card.Text>
                    {
                        kids.length > 0 ? (
                            kids.map(kids => (
                                kids.mycards.map(mycards => (
                                    <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} cols={cols} duedate={mycards.duedate} idOwner={mycards.owner_id} Idworkflow={mycards.workflow_id} index={index} indeK={indeK} dataWorkspace={dataWorkspace} workflowPos={workflowPos} nameCol={nameCol} api={api} colId={mycards.column_id}/>
                                ))
                            ))
                        ) : (
                            mycards.map(mycards => (
                                <NewCardTable key={mycards.id} id={mycards.id} nCard={mycards.name} cols={cols} duedate={mycards.duedate} idOwner={mycards.owner_id} Idworkflow={mycards.workflow_id} index={index} indeK={indeK} dataWorkspace={dataWorkspace} workflowPos={workflowPos} nameCol={nameCol} api={api} colId={mycards.column_id}/>
                            ))
                        )
                    }
                </Card.Text>
                <div  className='text-center'>
                <Button className="btn-danger rounded-circle p-0"><img width="50" src={plusIcon} alt='nextArrrow' onClick={() => setShowInsertCard(true)}/></Button>
                </div>
            </Card.Body>
        </Card>
        <InsertCardModal show={showInsertCard} onHide={() => setShowInsertCard(false)} columnID={idCol} wPos={workflowPos} columnName={nameCol} workflowID={idWork} api={api}/>
        </>
    )
}

export default NewColumnsTable