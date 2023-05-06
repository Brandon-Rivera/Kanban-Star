import React from 'react';
import { Carousel, Card, Container } from 'react-bootstrap';
import CardTable from './CardTable';
import "./css/BoardTable.css"

const recipes = [0, 1, 2, 3, 4, 5];

export function BoardTable() {
  const reduceRecipes = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  return (
    <Container>
      {/* <Carousel variant="dark" style={{ width: '40rem', height: "50rem" }}>
        <Carousel.Item>
          <Card className="text-light mb-2" style={{ width: '40rem', height: "50rem", backgroundColor: '#2665BB' }} >
            <Card.Header>Nombre columna</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
              <Card.Text>
                <CardTable />
                <CardTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="text-light mb-2" style={{ width: '40rem', height: "50rem", backgroundColor: '#2665BB' }}>
            <Card.Header>Nombre columna</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
              <Card.Text>
                <CardTable />
                <CardTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="text-light mb-2" style={{ width: '40rem', height: "50rem", backgroundColor: '#2665BB' }}>
            <Card.Header>Nombre columna</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
              <Card.Text>
                <CardTable />
                <CardTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel> */}
      <Carousel variant="dark">
        {recipes.reduce(reduceRecipes, []).map((item, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {item.map((item, index) => {
                return (
                  <Card key={index} className="text-light m-2 mx-3" style={{width:"30rem", height: "50rem", backgroundColor: '#2665BB' }} >
                    <Card.Header>Nombre columna</Card.Header>
                    <Card.Body style={{ backgroundColor: '#92B6E9' }}>
                      <Card.Text>
                        <CardTable />
                        {/* <CardTable/> */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default BoardTable

/*
    <Container>
      <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item className='d-flex justify-content-between'>
            <p className='m-0'>300</p>
            <p className='m-0'>Juan</p>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'>
            <p className='m-0'>Tarea</p>
            <p className='m-0'>Foto</p>
          </ListGroup.Item>
          <ListGroup.Item className='text-center'>Planificación 2</ListGroup.Item>
          <ListGroup.Item action href="#link1" className='text-center'>Seleccionar Carril</ListGroup.Item>
      </ListGroup>
    </Container> 


    <Card className="text-light mb-2" style={{ width: '30rem', backgroundColor: '#2665BB' }} >
        <Card.Header>Nombre columna</Card.Header>
        <Card.Body style={{ backgroundColor: '#92B6E9' }}>
          <Card.Text>
            <CardTable />
          </Card.Text>
        </Card.Body>
      </Card>    
    
*/