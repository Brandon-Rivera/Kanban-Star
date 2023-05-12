import React from "react";
import { Form } from "react-bootstrap";
import getCurrentDate from "../utils/getCurrentDate";
import getDeadline from "../utils/getDeadline";

// Componente para seleccionar la fecha de vencimiento de una tarjeta
function DatePickerComponent(readMode) {

  function getCorrectday() {
    if (!readMode.readMode) {
      return getCurrentDate();
    } else {
      return getDeadline(localStorage.getItem("cardDeadline"));
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Form.Group controlId="dob">
            <Form.Control
              readOnly={readMode.readMode}
              defaultValue={getCorrectday()}
              min={getCurrentDate()}
              className="text-primary bg-light m-0 p-2 border-left-0"
              type="date"
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default DatePickerComponent;
