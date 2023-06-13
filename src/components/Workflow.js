import React, { useState } from 'react'
import { Container, Accordion, Button } from 'react-bootstrap';
import InsertCardModal from './InsertCardModal.js';
import Cards from "./Cards.js"
import "./css/Workflow.css"
import { useTranslation } from 'react-i18next';

//Esto en realidad es la columna, NO EL WORKFLOW
function Workflow({ ownerID, title, col, dataWorkspace, workflowPos, api }) {
  // Hook para el modal de insertar tarjetas
  const [insertModalShow, setInsertModalShow] = useState(false);

  const [t] = useTranslation("global");

  return (
    <>
      <Container fluid="xs">
        <Accordion alwaysOpen defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body className='acc-body'>

              {/* Muestra tarjetas cuando este activada la opcion de "Todas las tarjetas" */}
              {col.mycards.map(col => (

                ownerID === 0 ? (
                  <Cards nCard={col.name} cardWid={col.column_id} duedate={col.duedate} dataWorkspace={dataWorkspace} workflowPos={workflowPos} idCard={col.id} cCard={title} api={api}></Cards>
                ) : (
                  <></>
                )

              ))
              }

              {/* Muestra las tarjetas de acuerdo al propietario seleccionado */}
              {col.mycards.map(col => (

                ownerID === col.owner_id ? (
                  <Cards nCard={col.name} cardWid={col.column_id} duedate={col.duedate} dataWorkspace={dataWorkspace} workflowPos={workflowPos} idCard={col.id} cCard={title} api={api}></Cards>
                ) : (
                  <></>
                )

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
                wPos={workflowPos}
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

