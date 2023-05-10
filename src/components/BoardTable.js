import React, { useState, useRef, useEffect } from 'react';
import { Card, Container, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import CardTable from './CardTable';
import "./css/BoardTable.css"

export function BoardTable({ api }) {
  //Variable para obtener los datos del workspace en un hook
  const [dataWorkspace, setDataWorkspace] = useState({ data: [] });

  useEffect(() => {

    //Valores necesarios para la peticion get de workspace
    const values = {
      domain: localStorage.getItem('domain'),
      apikey: localStorage.getItem('apikey'),
      boardid: 19
    }

    //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
    const getWorkSpace = async () => {

      const response = await fetch(`${api}/board`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values)
      })
      const data = await response.json()
      setDataWorkspace(data)
    }

    //llamada a la funcion
    getWorkSpace()
  }, [api])

  const scrollingWrapperRef = useRef(null);

  const handleNext = () => {
    scrollingWrapperRef.current.scrollLeft += scrollingWrapperRef.current.offsetWidth - 28;
  };

  const handlePrev = () => {
    scrollingWrapperRef.current.scrollLeft -= scrollingWrapperRef.current.offsetWidth - 28;
  };

  console.log(dataWorkspace)

  return (
    <Container fluid>
      <DropdownButton id="dropdown-basic-button" title="Workspaces">
        {
          dataWorkspace.data.map(data => (
            <Dropdown.Item href="#/action-1">{data.name}</Dropdown.Item>
      ))
      }
      </DropdownButton>
      {
        dataWorkspace.data.map(data => (
          <div>

            <div className="row scrolling-wrapper flex-row flex-nowrap" ref={scrollingWrapperRef}>
              {
                data.columns.map(columns => (
                  columns.kids.length > 0 ? (
                    <div className="col-11 col-md-4">
                      <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
                        <Card.Header>{columns.name}</Card.Header>
                        <Card.Body style={{ backgroundColor: '#92B6E9' }}>
                          <Card.Text>
                            {
                              columns.kids.map(kids => (
                                kids.mycards.map(mycards => (
                                  <CardTable id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} />
                                ))
                              ))
                            }
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ) : (
                    <div className="col-11 col-md-4">
                      <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
                        <Card.Header>{columns.name}</Card.Header>
                        <Card.Body style={{ backgroundColor: '#92B6E9' }}>
                          <Card.Text>
                            {
                              columns.mycards.map(mycards => (
                                <CardTable id={mycards.id} nCard={mycards.name} duedate={mycards.duedate} />
                              ))
                            }
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                ))
              }
            </div>
          </div>
        ))
      }
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" onClick={handlePrev}>Anterior</button>
        <button className="btn btn-primary" onClick={handleNext}>Siguiente</button>
      </div>
    </Container>
  );
}

export default BoardTable;