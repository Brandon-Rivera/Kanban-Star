// Se importan las librerías y componentes necesarios
import "./InsertCardModal.css"
import React, { useState }  from "react";
import { useTranslation } from "react-i18next"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import DatePickerComponent from './DatePicker';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal'

// Funcion que contiene el componente del formulario para la creación de tarjetas
function InsertCardModal({show, onHide}) {
  // Variable que contiene el mapa de traducciones
  const [t] = useTranslation("global")

  // Asignar variables y su respectivo hook
  const [cardName, setCardName] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [cardDueDate, setCardDueDate] = useState('');
  const [cardWorkflow, setCardWorkflow] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  // Funcion para asignar los valores a las keys
  const handleCardSubmit = async (e) =>{
    e.preventDefault();
    const values = {
      domain: localStorage.getItem('domain'),
      apikey: localStorage.getItem('apikey'),
      columnid: 106,
      workflowid: 22,
      title: cardName,
      description: cardDescription,
      ownerid: localStorage.getItem('userid'),
      duedate: cardDueDate + "T20:20:20.727Z"
    };

    // Funcion que manda la petición tipo POST para insertar la tarjeta
    const response = await fetch('http://localhost:3001/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    //console.log(values);
    const data = await response.json;

    if(data.status === false){
      console.log("Error")
    }
    else{
      console.log("Card Inserted")
    }
  }
    return (
      // Creacion del modal que contiene el formulario de insercion de tarjetas
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Componente de tipo Form */}
        <Form onSubmit={handleCardSubmit}>
          {/* Componente Header del modal, contiene cuadro de texto tipo input y botón de cierre */}
          <Modal.Header closeButton className='modalHeader'>
            <Modal.Title id="contained-modal-title-vcenter">
            <Form.Control
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className='cardInputBox'
              type='text'
              placeholder={t("insertcard.card-title")}
              size='lg'
              autoFocus
            />
            </Modal.Title>
          </Modal.Header>
          {/* Componente Body del modal, incluyendo el resto del formulario */}
          <Modal.Body>
            {/* Componente que contiene el dropdown para elegir propietario */}
            <InputGroup className="mb-2">
              <InputGroup.Text
                id="basic-addon1"
                className='insertDropdown'>
                {t("insertcard.card-owner")}
              </InputGroup.Text>
              <DropdownButton
                title="Jonathan Maya"
                bsPrefix='drop1'>
                  <Dropdown.Item href="#/action-1">
                    Jonathan Maya
                  </Dropdown.Item>
              </DropdownButton>
            </InputGroup>
            {/* Componente que contiene el date picker */}
            <InputGroup className="mb-2">
              <InputGroup.Text
                id="basic-addon1">
                  {t("insertcard.due-date")}
              </InputGroup.Text>
              <div id = "datepicker"
                value={cardDueDate}
                onChange={(e) => setCardDueDate(e.target.value)}
                type='date'>
                <DatePickerComponent/>
              </div>
            </InputGroup>
            {/* Componente que contiene el dropdown para elegir carril */}
            <InputGroup className="mb-2">
              <InputGroup.Text>
                {t("insertcard.workflow")}
              </InputGroup.Text>
              <DropdownButton
                title={t("insertcard.choose-workflow")}
                bsPrefix='drop1'>
                  <Dropdown.Item href="#/action-1">
                    Backlog
                  </Dropdown.Item>
              </DropdownButton>
            </InputGroup>
            {/* Componente que contiene el cuadro de texto para escribir el comentario de la tarjeta */}
            <InputGroup className="mb-2">
              <InputGroup.Text>
                {t("insertcard.description")}
              </InputGroup.Text>
              <Form.Control
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                className='cardDescriptionBox'
                type="text"
                placeholder={t("insertcard.description-placeholder")}
              />
            </InputGroup>
          </Modal.Body>
          {/* Componente Footer del modal, conteniendo el boton para enviar el formulario */}
          <Modal.Footer className='modalFooter'>
            <Button
              type="submit"
              variant="primary"
              onClick={onHide}
            >
              {t("insertcard.add-card")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  export default InsertCardModal;
