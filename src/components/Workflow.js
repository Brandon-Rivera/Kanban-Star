import React, { useState } from 'react'
import { Container, Accordion, Button } from 'react-bootstrap';
import InsertCardModal from './InsertCardModal.js';
import Cards from "./Cards.js"
import "./css/Workflow.css"
import { useTranslation } from 'react-i18next';


//Esto en realidad es la columna, NO EL WORKFLOW
function Workflow({ title, col, api }) {
  // Hook para el modal de insertar tarjetas
  const [insertModalShow, setInsertModalShow] = useState(false);

  const [t] = useTranslation("global");

  return (
    <>
      <Container fluid="xs">
        <Accordion alwaysOpen >
          <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body className='acc-body'>
              {col.mycards.map(col => (
                <Cards nCard={col.name} duedate={col.duedate} idCard={col.id} cCard={title} ></Cards>
              ))
              }
              <Button 
                className='d-flex w-100 text-center'
                onClick={() => setInsertModalShow(true)}
                >
                  {t("insertcard.add-card")}
              </Button>
              {/* Modal para insertar tarjetas */}
              <InsertCardModal
                show={insertModalShow}
                onHide={() => setInsertModalShow(false)}
                columnID={col.id}
                columnName={col.name}
                workflowID={col.workflow_id}
                api={api}
            />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default Workflow

