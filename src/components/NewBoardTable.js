import React, { useRef, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewColumnsTable from './NewColumnsTable';
import nextArr from "../images/Siguiente.png";
import plusIcon from "../images/plus.png";
import "./css/NewBoardTable.css";

export function NewBoardTable({ nameWF, dataWorkspace }) {
    const scrollingWrapperRef = useRef(null);
    const [resultNWF, setResultNWF] = useState('');
    const [ram, setRam] = useState('')

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

    // function moveon() {
    //      const result0 = nameWF.columns.mycards.filter(item => item.id !== 55); //elimino la card
    //      console.log(result0);
    //      mycards = result0;                                                     //copio las demás cards
    //      const result1 = nameWF.columns.mycards.filter(item => item.id === 55); //copio la card
    //      const result2 = nameWF.columns[index+1].mycards.unshift(result1);      //Quiero pegar la card en el array siguiente
    // }
    // const result0 = nameWF.columns.mycards.filter(item => item.id !== 55); // elimino la card
    // nameWF.columns.mycards = result0;
    // const result1 = nameWF.columns.mycards.find(item => item.id === 55); // encuentro la card a pegar
    // if (result1) {
    //     const ram = nameWF.columns[0 + 1].mycards.unshift(result1); // agrego la card al array siguiente
    //     console.log(ram);
    // }

    const handleCardMove = (cardId, index) => {
        if (index < resultNWF.columns.length) {
            const res0 = resultNWF.columns[index].mycards.filter(item => item.id !== cardId); //elimino la card ctrl-x
            const result1 = resultNWF.columns[index].mycards.find(item => item.id === cardId); // encuentro la card a pegar ctrl-x
            resultNWF.columns[index].mycards = res0;
            if (result1) {
                setRam(resultNWF.columns[index + 1].mycards.unshift(result1)); // agrego la card al array siguiente
                console.log(resultNWF.columns);
            }
        }
    }

    return (
        <Container fluid>
            <div className="d-flex justify-content-between my-2 fixed-bottom">
                <Button className="btn-info rounded-circle p-0 pre-btn" onClick={handlePrev}><img width="50" src={nextArr} alt='nextArrrow' /></Button>
                <Button className="btn-danger rounded-circle p-0"><img width="50" src={plusIcon} alt='nextArrrow' /></Button>
                <Button className="btn-info rounded-circle p-0 nxt-btn" onClick={handleNext}><img width="50" src={nextArr} alt='nextArrrow' /></Button>
            </div>
            {
                resultNWF ? [resultNWF].map(data => (
                    <div key={data.id}>
                        <div className="scrolling-wrapper row flex-row flex-nowrap" ref={scrollingWrapperRef}>
                            {
                                data.columns.map((columns, index) => (
                                    columns.kids.length > 0 ? (
                                        columns.kids.map(kids => (
                                            <div className="col-11 col-md-3">
                                                <NewColumnsTable key={data.id} kids={kids} nameCol={kids.name} mycards={kids.mycards} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-11 col-md-3">
                                            <NewColumnsTable key={data.id} kids={[]} mycards={columns.mycards} nameCol={columns.name} index={index} onCardMove={handleCardMove} />
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
