import React, { useRef, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewColumnsTable from './NewColumnsTable';
import nextArr from "../images/Siguiente.png";

import "./css/NewBoardTable.css";

export function NewBoardTable({ nameWF, dataWorkspace, api }) {
    const scrollingWrapperRef = useRef(null);
    const [resultNWF, setResultNWF] = useState('');

    useEffect(() => {
        const res = (dataWorkspace.data.find(data => data.name === nameWF))
        setResultNWF(res);
    }, [nameWF, dataWorkspace]);

    const handleNext = () => {
        scrollingWrapperRef.current.scrollLeft += scrollingWrapperRef.current.offsetWidth - 31;
    };

    const handlePrev = () => {
        scrollingWrapperRef.current.scrollLeft -= scrollingWrapperRef.current.offsetWidth - 31;
    };

    const color = (() => {
        const colors = ['#42AD49', '#E4186A','#2665BB', '#F08830'];
        let index = 0;
        return () => {
            const color = colors[index];
            index = (index + 1) % colors.length;
            return color;
        };
    })();

    return (
        <Container fluid className='mb-5'>
            <div className="d-flex justify-content-between my-2 fixed-bottom">
                <Button className="btn-info rounded-circle p-0 pre-btn" onClick={handlePrev}><img width="50" src={nextArr} alt='nextArrrow' /></Button>
                <Button className="btn-info rounded-circle p-0 nxt-btn" onClick={handleNext}><img width="50" src={nextArr} alt='nextArrrow' /></Button>
            </div>
            {
                resultNWF ? [resultNWF].map(data => (
                    <div key={data.id}>
                        <div className="scrolling-wrapper row flex-row flex-nowrap" ref={scrollingWrapperRef}>
                            {
                                data.columns.map((columns, index) => (
                                    columns.kids.length > 0 ? (
                                        columns.kids.map((kids, indeK) => (
                                            <div className="col-11 col-md-3">
                                                <NewColumnsTable key={data.id} kids={kids} nameCol={kids.name} idCol={kids.id} idWork={kids.workflow_id} cols={data} mycards={kids.mycards} index={index} indeK={indeK} dataWorkspace={dataWorkspace} workflowPos={data.pos} api={api} color={color()}/>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-11 col-md-3">
                                            <NewColumnsTable key={data.id} kids={[]} mycards={columns.mycards} nameCol={columns.name} idCol={columns.id} idWork={columns.workflow_id} cols={data} index={index} indeK={-1} dataWorkspace={dataWorkspace} workflowPos={data.pos} api={api} color={color()}/>
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
