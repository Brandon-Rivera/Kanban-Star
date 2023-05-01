import React, {useState} from 'react'
import { Container, Accordion, Button } from 'react-bootstrap';
import InsertCardModal from './InsertCardModal.js';
import Cards from "./Cards.js"
import "./Workflow.css"



function Workflow({ title, col }) {
  const [insertModalShow, setInsertModalShow] = useState(false);

  return (
    <>
      <Container fluid="xs">
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              {col.mycards.map(col => (
                <Cards nCard={col.name} duedate={col.duedate} ></Cards>
              ))
              }
              <Button 
                className='d-flex w-100 text-center'
                onClick={() => setInsertModalShow(true)}
                >
                  Agregar tarjetas
              </Button>
              <InsertCardModal
                show={insertModalShow}
                onHide={() => setInsertModalShow(false)}
                columnID={col.id}
                columnName={col.name}
                workflowID={col.workflow_id}
            />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default Workflow

