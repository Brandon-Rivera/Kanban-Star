import React, { useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewColumnsTable from './NewColumnsTable';
import "./css/NewBoardTable.css"

export function NewBoardTable({ nameWF, dataWorkspace }) {
    const scrollingWrapperRef = useRef(null);

    const handleNext = () => {
        scrollingWrapperRef.current.scrollLeft += scrollingWrapperRef.current.offsetWidth - 31;
    };

    const handlePrev = () => {
        scrollingWrapperRef.current.scrollLeft -= scrollingWrapperRef.current.offsetWidth - 31;
    };

    const result = dataWorkspace.data.find(data => data.name === nameWF)

    return (
        <Container fluid>
            <div className="d-flex justify-content-between mt-3">
                <Button className="btn-primary" onClick={handlePrev}>Anterior</Button>
                <Button className="btn-primary" onClick={handleNext}>Siguiente</Button>
            </div>
            {
                result ? [result].map(data => (
                    <div>
                        <div className="row scrolling-wrapper flex-row flex-nowrap" ref={scrollingWrapperRef}>
                            {
                                data.columns.map(columns => (
                                    columns.kids.length > 0 ? (
                                        columns.kids.map(kids => (
                                            <div className="col-11 col-md-3">
                                                <NewColumnsTable key={data.id} kids={kids} nameCol={kids.name} mycards={kids.mycards} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-11 col-md-3">
                                            <NewColumnsTable key={data.id} kids={[]} mycards={columns.mycards} nameCol={columns.name} />
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    </div>
                )) : []
            }
        </Container>
    );
}

export default NewBoardTable;
