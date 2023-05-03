import React from 'react'
import { Form } from 'react-bootstrap';

// Componente para seleccionar la fecha de vencimiento de una tarjeta
class DatePickerComponent extends React.Component{
 
    render(){
 
        return(
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <Form.Group controlId="dob">
                            <Form.Control
                                className='text-primary bg-light m-0 p-2 border-left-0'
                                type="date"
                                 />
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }
     
}
 
export default DatePickerComponent;