import React from 'react'
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import "./Workflow.css"

import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Workflow({ title, ddline, nCard, id, imag, col }) {
  const xrow = (name) => {
    return (
      <Row>
        <Col className="border border-secondary rounded text-center mx-4 mb-2 p-2" style={{ backgroundColor: 'grey' }} > {name} </Col>
        <Col className="border border-secondary rounded text-center mx-4 mb-2 p-2" style={{ backgroundColor: 'grey' }} >ID</Col>
        <Col className="border border-secondary rounded text-center mx-4 mb-2 p-2" style={{ backgroundColor: 'grey' }} >Foto</Col>
      </Row>
    )
  }
  const yrow = (nCard, ddline) => {
    return (
      // <Row>
      //   <Col className="border border-secondary p-2"> {nCard} </Col>
      //   <Col className="border border-secondary p-2"> {id} </Col>
      //   <Col className="border border-secondary p-2"> {imag}</Col>
      // </Row>
      <ListGroup as="ol">
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start my-1">
          <div className="me-2">
            <div className="fw-bold">{nCard}</div>
            {ddline}
          </div>
          <Button centered>Menu</Button>
        </ListGroup.Item>
      </ListGroup>
    )
  }

  // const zrow = () => {
  //   return (
  //     <Row>
  //       <Col className="border border-secondary rounded">Agregar más tarjetas</Col>
  //       <Button >Agregar tarjetas</Button>
  //     </Row>
  //   )
  // }

  const arow = (col) => {
    <Accordion.Item eventKey="1">
      <Accordion.Header>Accordion Item #1</Accordion.Header>
      <Accordion.Body>
        {col.mycards.map(col => (
          yrow(nCard = col.name, id = col.id, imag = "imag")
        ))
        }
      </Accordion.Body>
    </Accordion.Item>
  }

  return (
    <>
      
      <Container fluid="xs">
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              {/* {xrow(name = title)} */}
              {col.mycards.map(col => (
                yrow(nCard = col.name, ddline = col.duedate)
              ))
              }
              {/* {arow(col)} */}
              {/* {zrow()} */}
              <Button className='d-flex w-100 text-center'>Agregar tarjetas</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default Workflow

/*
<Container fluid>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col className="border border-secondary rounded text-center mx-4 mb-2 p-2" style={{ backgroundColor: 'grey' }} >Backlog</Col>
                <Col className="border border-secondary rounded text-center mx-4 mb-2 p-2" style={{ backgroundColor: 'grey' }} >ID</Col>
                <Col className="border border-secondary rounded text-center mx-4 mb-2 p-2" style={{ backgroundColor: 'grey' }} >Foto</Col>
              </Row>
              <Row>
                <Col className="border border-secondary p-2">Hacer MVP</Col>
                <Col className="border border-secondary p-2">300</Col>
                <Col className="border border-secondary p-2">*Imagen*</Col>
              </Row>
              <Row>
                <Col className="border border-secondary p-2">Hacer MVP</Col>
                <Col className="border border-secondary p-2">301</Col>
                <Col className="border border-secondary p-2">*Imagen*</Col>
              </Row>
              <Row>
                <Col className="border border-secondary rounded">Agregar más tarjetas</Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Por Hacer</Accordion.Header>
            <Accordion.Body>
              <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Accordion Item #1</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Accordion Item #2</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
*/

