import React from 'react'
import { Container, Accordion, Button } from 'react-bootstrap';
import Cards from "./Cards.js"
import "./css/Workflow.css"



function Workflow({ title, col }) {

  return (
    <>
      <Container fluid="xs">
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              {col.mycards.map(col => (
                <Cards nCard={col.name} duedate={col.duedate}></Cards>
              ))
              }
              <Button className='d-flex w-100 text-center'>Agregar tarjetas</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default Workflow

