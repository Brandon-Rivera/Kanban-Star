// Se importan las librerías y componentes necesarios
import "./css/InsertCardModal.css";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePickerComponent from "./DatePicker";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import SuccessCardModal from "./SuccessCardModal";
import ErrorCardModal from "./ErrorCardModal";
import getCorrectDate from "../utils/getCorrectDay";
import getShortName from "../utils/getShortName";
import getCurrentDate from "../utils/getCurrentDate";
import { DataContext } from "../Contexts/DataContext.js";
import getDeadline from "../utils/getDeadline";
import Cookies from "js-cookie";

// Funcion que contiene el componente del formulario para la creación de tarjetas
function InsertCardModal({
  show,
  onHide,
  columnID,
  wPos,
  columnName,
  workflowID,
  api,
}) {
  // Variable que contiene el mapa de traducciones
  const [t] = useTranslation("global");

  // Asignar hooks para los campos del formulario
  const [cardName, setCardName] = useState("");
  const [cardOwner, setCardOwner] = useState(null);
  const [cardDueDate, setCardDueDate] = useState(getCurrentDate());
  const [cardDescription, setCardDescription] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(
    `${t("insertcard.choose-owner")}`
  );

  // Modales de respuesta y error
  const [resModal, setResModal] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const [errModal2, setErrModal2] = useState(false);

  // Contexto que contiene la data de los owners
  // y la funcion para insertar una nueva tarjeta
  const { insertNewCard, dataOw, dataW } = useContext(DataContext);
  // Constante que contiene el id del lane
  const laneId = dataW?.data[wPos]?.lanes[0]?.id;

  // Funcion para estado inicial del formulario
  function insertInitialState() {
    setCardName("");
    setSelectedOwner(`${t("insertcard.choose-owner")}`);
    setCardDueDate(getCurrentDate());
    setCardDescription("");
  }

  // Funcion para hacer la peticion POST para insertar la tarjeta
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    const values = {
      columnid: columnID,
      workflowid: workflowID,
      laneid: laneId,
      title: cardName,
      description: "<p>" + cardDescription + "</p>",
      ownerid: cardOwner,
      duedate: getCorrectDate(cardDueDate),
    };

    // Funcion que manda la petición tipo POST para insertar la tarjeta
    const response = await fetch(`${api}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "supra-access-token": Cookies.get("token"),
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    insertInitialState();

    if (data.error) {
      if(data.error.code === 'TI07'){
        setErrModal2(true);

      } else{
        setErrModal(true);
      }
    } else {
      const newCard = {
        id: data.data[0].card_id,
        name: data.data[0].title,
        description: data.data[0].description,
        owner_id: data.data[0].owner_user_id,
        duedate: getDeadline(data.data[0].deadline),
        workflow_id: data.data[0].workflow_id,
        column_id: data.data[0].column_id,
        pos: null,
      };
      insertNewCard(newCard);
      setResModal(true);
    }
  };

  const handleConfirm = () => {
    return
  }

  return (
    // Creacion del modal que contiene el formulario de insercion de tarjetas
    <>
      <Modal
        backdrop="static"
        show={show}
        onHide={() => {
          onHide();
          insertInitialState();
        }}
        scrollable
        centered
      >
        {/* Componente de tipo Form */}
        <Form onSubmit={handleCardSubmit}>
          {/* Componente Header del modal, contiene cuadro de texto tipo input y botón de cierre */}
          <Modal.Header closeButton className="bg-success">
            <Modal.Title>
              <Form.Control
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="cardInputBox bg-success fw-bold"
                type="text"
                placeholder={t("insertcard.card-title")}
                size="lg"
                as="textarea"
                rows={2}
                autoFocus
              />
            </Modal.Title>
          </Modal.Header>
          {/* Componente Body del modal, incluyendo el resto del formulario */}
          <Modal.Body>
            {/* Componente que contiene el dropdown para elegir propietario */}
            <InputGroup className="mb-2">
              <InputGroup.Text className="fw-bold">
                {t("insertcard.card-owner")}
              </InputGroup.Text>
              <Dropdown>
                <Dropdown.Toggle
                  title={selectedOwner}
                  value={cardOwner}
                  variant="primary drop1 fw-bold"
                  style={{
                    width: "fit-content",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getShortName(selectedOwner)}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "12em",
                    overflowY: "scroll",
                    maxWidth: "13em",
                  }}
                >
                  {dataOw?.data.map((data) => (
                    <Dropdown.Item
                      className="fw-bold"
                      key={data.user_id}
                      onClick={() => {
                        setCardOwner(data.user_id);
                        setSelectedOwner(data.username);
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {data.username}
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
            {/* Componente que contiene el date picker */}
            <InputGroup className="mb-2">
              <InputGroup.Text className="fw-bold">
                {t("insertcard.due-date")}
              </InputGroup.Text>
              <div
                id="datepicker"
                value={cardDueDate}
                onChange={(e) => setCardDueDate(e.target.value)}
                type="date"
              >
                <DatePickerComponent readMode={false} update={false} />
              </div>
            </InputGroup>
            {/* Componente que contiene el dropdown para elegir carril */}
            <InputGroup className="mb-2">
              <InputGroup.Text className="fw-bold">
                {t("insertcard.column")}
              </InputGroup.Text>
              <Dropdown>
                <Dropdown.Toggle
                  title={columnName}
                  variant="primary drop1 fw-bold"
                  style={{
                    width: "fit-content",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getShortName(columnName)}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "12em",
                    overflowY: "scroll",
                    maxWidth: "13em",
                  }}
                >
                  {
                    <Dropdown.Item>
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {columnName}
                      </div>
                    </Dropdown.Item>
                  }
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
            {/* Componente que contiene el cuadro de texto para escribir la descripcion de la tarjeta */}
            <InputGroup className="mb-2">
              <InputGroup.Text className="fw-bold">
                {t("insertcard.description")}
              </InputGroup.Text>
              <Form.Control
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                className="cardDescriptionBox fw-bold"
                type="text"
                as="textarea"
                rows={4}
                placeholder={t("insertcard.description-placeholder")}
              />
            </InputGroup>
          </Modal.Body>
          {/* Componente Footer del modal, conteniendo el boton para enviar el formulario */}
          <Modal.Footer className="modalFooter">
            <Button type="submit" variant="primary fw-bold" onClick={onHide}>
              {t("insertcard.add-card")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modales de respuesta y error */}
      <SuccessCardModal
        show={resModal}
        onHide={() => setResModal(false)}
        onConfirm={handleConfirm}
        title={t("insertcard.insert-success")}
        message={t("insertcard.insert-message")}
        button={t("insertcard.insert-button")}
      />
      <ErrorCardModal
        show={errModal}
        onHide={() => setErrModal(false)}
        title={t("insertcard.insert-success-er")}
        message={t("insertcard.insert-message-er")}
        button={t("insertcard.insert-button-er")}
      />
      <ErrorCardModal
        show={errModal2}
        onHide={() => setErrModal2(false)}
        title={t("insertcard.insert-success-er")}
        message={t("insertcard.insert-message-er2")}
        button={t("insertcard.insert-button-er")}
      />
    </>
  );
}

export default InsertCardModal;
