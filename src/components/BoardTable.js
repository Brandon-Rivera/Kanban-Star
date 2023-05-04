import React from 'react';
import { Carousel } from 'react-bootstrap';
import CardTable from './CardTable';
import "./css/BoardTable.css"

const recipes = [0, 1, 2, 3, 4, 6];

export function BoardTable() {
  const reduceRecipes = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <CardTable />
        
      </Carousel.Item>
      <Carousel.Item>
        <CardTable />

      </Carousel.Item>
      <Carousel.Item>
        <CardTable />

      </Carousel.Item>
    </Carousel>
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
    </Container> */