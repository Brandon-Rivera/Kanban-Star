import React from 'react'
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { BsRecordCircleFill } from "react-icons/bs"

// padre 2 8 2
// hijo 3 7 2

function MoveColumn({title, tabCol1, tabCol2}) {
    return (
        <div>
            <Form>
                <div key={`reverse-checkbox`} className="mb-3">
                    <Row className='d-flex align-items-center'>
                        {/* justify-content-end para kid */}
                        <Col xs={tabCol1} md={tabCol1} className='d-flex justify-content-end m-0 p-2'>
                            <BsRecordCircleFill color='gray' className='d-flex justify-content-center align-self-end m-1' size={15} />
                        </Col>
                        <Col xs={tabCol2} md={tabCol2} className='d-flex justify-content-start m-0 p-0'>
                            <h5 className='d-flex justify-content-start m-0 text-start'>{title}</h5>
                        </Col>
                        <Col xs={2} md={2} className='d-flex justify-content-center m-0 p-0'>
                            <Form.Check
                                reverse
                                name="group1"
                                type='checkbox'
                                id={`reverse-checkbox-1`}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}

export default MoveColumn