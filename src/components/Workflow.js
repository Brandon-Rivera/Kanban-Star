import React from 'react'
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import "./Workflow.css"


function Workflow({ title }) {

  return (
    <>
      <div className="border border-secondary rounded m-3 p-2 text-center bg-white text-secondary">
        <h4>{title}</h4>
      </div>
      <Container fluid>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>Backlog</Accordion.Header>
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
    </>
  )
}

export default Workflow

/*
<Container flush>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col style={{ backgroundColor: 'violet' }}>1 of 2</Col>
                <Col>2 of 2</Col>
              </Row>
              <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
              </Row>
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
      </Container>
*/