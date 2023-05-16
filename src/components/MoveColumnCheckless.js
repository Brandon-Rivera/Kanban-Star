import React from 'react'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { BsRecordCircleFill } from "react-icons/bs"

function MoveColumnCheckless({ column, tabCol1, tabCol2, dotColor, cardid, cardWid, api }) {

    return (
        <>
            <div key={`reverse-checkbox`} className="mb-3">
                <Row className='d-flex align-items-center'>
                    {/* justify-content-end para kid */}
                    <Col xs={tabCol1} md={tabCol1} className='d-flex justify-content-end m-0 p-2'>
                        <BsRecordCircleFill color={dotColor} className='d-flex justify-content-center align-self-end m-1' size={15} />
                    </Col>
                    <Col xs={tabCol2} md={tabCol2} className='d-flex justify-content-start m-0 p-0'>
                        <h5 className='d-flex justify-content-start m-0 text-start'>{column.name}</h5>
                    </Col>
                    <Col xs={2} md={2} className='d-flex justify-content-center m-0 p-0'>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default MoveColumnCheckless