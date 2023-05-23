import React, { useRef, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewColumnsTable from './NewColumnsTable';
import nextArr from "../images/Siguiente.png";
import plusIcon from "../images/plus.png";
import "./css/NewBoardTable.css";

export function NewBoardTable({ nameWF, dataWorkspace }) {
    const scrollingWrapperRef = useRef(null);
    const [resultNWF, setResultNWF] = useState('');
    const [ram, setRam] = useState({});

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

    const handleCardMove = (cardId, index, indeK) => {
        if (index < resultNWF.columns.length) {
            if (resultNWF.columns[index].kids.length > 0) {
                const res0 = resultNWF.columns[index].kids[indeK].mycards.filter(item => item.id !== cardId);
                const result1 = resultNWF.columns[index].kids[indeK].mycards.find(item => item.id === cardId); // encuentro la card a pegar ctrl-x
                resultNWF.columns[index].kids[indeK].mycards = res0;                                            //Nuevo valores de mycards
                if (result1) {
                    console.log(index, indeK);
                    if (resultNWF.columns[index + 1].kids.length > 0) {                                       //si la siguiente columna tiene kids
                        // setRam(resultNWF.columns[index + 1].kids[index].mycards.unshift(result1));
                        // console.log("1,2,3", ram)
                        const newMycards = [...resultNWF.columns[index + 1].mycards];
                        newMycards.unshift(result1);
                        resultNWF.columns[index + 1].kids[index].mycards = newMycards;
                        setRam(newMycards);
                        console.log("1,2,3", ram);
                    }
                    else {
                        if (resultNWF.columns[index].kids[indeK + 1]) {
                            // setRam(resultNWF.columns[index].kids[indeK + 1].mycards.unshift(result1));
                            const newMycards = [...resultNWF.columns[index + 1].mycards];
                            newMycards.unshift(result1);
                            resultNWF.columns[index].kids[indeK + 1].mycards = newMycards;
                            setRam(newMycards);
                            console.log("1,2,3,4", ram)
                        }
                        else {
                            const newMycards = [...resultNWF.columns[index + 1].mycards];
                            newMycards.unshift(result1);
                            resultNWF.columns[index + 1].mycards = newMycards;
                            setRam(newMycards);
                        }
                    }
                }
                console.log("resA", indeK, resultNWF);
            }
            else {
                const res0 = resultNWF.columns[index].mycards.filter(item => item.id !== cardId); //elimino la card ctrl-x
                const result1 = resultNWF.columns[index].mycards.find(item => item.id === cardId); // encuentro la card a pegar ctrl-x
                resultNWF.columns[index].mycards = res0;                                           //Nuevo valores de mycards
                if (result1) {
                    if (resultNWF.columns[index + 1].kids.length > 0) {                                       //si la columna tiene kids
                        // setRam(resultNWF.columns[index + 1].kids[index].mycards.unshift(result1));
                        // console.log("1,2,3")
                        const newMycards = [...resultNWF.columns[index + 1].mycards];
                        newMycards.unshift(result1);
                        resultNWF.columns[index].kids[indeK + 1].mycards = newMycards;
                        setRam(newMycards);
                        console.log("1,2,3")
                    }
                    else {
                        const newMycards = [...resultNWF.columns[index + 1].mycards];
                        newMycards.unshift(result1);
                        resultNWF.columns[index + 1].mycards = newMycards;
                        setRam(newMycards);
                    }
                }
                console.log("resB", indeK, resultNWF);
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
                                        columns.kids.map((kids, indeK) => (
                                            <div className="col-11 col-md-3">
                                                <NewColumnsTable key={data.id} kids={kids} nameCol={kids.name} mycards={kids.mycards} index={index} indeK={indeK} onCardMove={handleCardMove} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-11 col-md-3">
                                            <NewColumnsTable key={data.id} kids={[]} mycards={columns.mycards} nameCol={columns.name} index={index} indeK={-1} onCardMove={handleCardMove} />
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
