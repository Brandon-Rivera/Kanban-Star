import React, { useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import getCurrentDate from "../utils/getCurrentDate";
import getDeadline from "../utils/getDeadline";
import { DataContext } from "../Contexts/DataContext";

// Componente para seleccionar la fecha de vencimiento de una tarjeta
function DatePickerComponent({ readMode, update }) {
  const { dataC }= useContext(DataContext);

  useEffect(() => {}, [dataC])

  function getCorrectday() {
    if (!readMode && update) {
      return getDeadline(dataC?.deadline);
    } else if (!readMode) {
      return getCurrentDate();
    } else {
      return getDeadline(dataC?.deadline);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Form.Group controlId="dob">
            <Form.Control
              readOnly={readMode}
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
