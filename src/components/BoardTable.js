import React, { useState, useRef } from 'react';
import { Carousel, Card, Container, Button } from 'react-bootstrap';
import CardTable from './CardTable';
import "./css/BoardTable.css"

export function BoardTable() {
  const scrollingWrapperRef = useRef(null);

  const handleNext = () => {
    scrollingWrapperRef.current.scrollLeft += scrollingWrapperRef.current.offsetWidth - 28;
  };

  const handlePrev = () => {
    scrollingWrapperRef.current.scrollLeft -= scrollingWrapperRef.current.offsetWidth - 28;
  };

  return (
    <div className="container-fluid">
      <h2 className="mt-1">Horizontal Scrolling</h2>
      <div className="scrolling-wrapper row flex-row flex-nowrap" ref={scrollingWrapperRef}>
        <div className="col-11">
          <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
            <Card.Header>Nombre columna</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
              <Card.Text>
                <CardTable />
                <CardTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-11">
          <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
            <Card.Header>Nombre columna</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
              <Card.Text>
                <CardTable />
                <CardTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-11">
          <Card className="text-light w-100 p-0" style={{ backgroundColor: '#2665BB' }} >
            <Card.Header>Nombre columna</Card.Header>
            <Card.Body style={{ backgroundColor: '#92B6E9' }}>
              <Card.Text>
                <CardTable />
                <CardTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" onClick={handlePrev}>Anterior</button>
        <button className="btn btn-primary" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}

export default BoardTable;