// Se importan las librerías y componentes necesarios
import React from "react";
import "./css/ViewCardModal.css";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import DatePickerComponent from "./DatePicker";
import getUsername from "../utils/getUsername";
import getCorrectDescription from "../utils/getCorrectDescription";
import getShortName from "../utils/getShortName";

// Funcion que contiene el componente del modal de comsulta de tarjetas
function ViewCardModal({ show, onHide, cardDetails, cardColumn }) {
  // Variable que contiene el mapa de traducciones
  const [t] = useTranslation("global");
  // Variable que contiene el estado de la tarjeta
  const isBloqued = cardDetails.data ? cardDetails.data.is_blocked : false;
  // Variable que el estado de la fecha limite
  const isDeadline = localStorage.getItem("isDeadline");
  // Funcion que devuelve el username del owner de la tarjeta
  function getCorrectUsername(username) {
    if (username === "" || username === null) {
      return `${t("insertcard.choose-owner")}`;
    } else {
      return username;
    }
  }

  // Funcion que devuelve el titulo de la tarjeta
  function getTitle(title) {
    if (title === "" || title === null) {
      return `${t("viewcard.no-title")}`;
    } else {
      return title;
    }
  }

  // Funcion que devuelve la descripcion de la tarjeta
  function getDescription(description) {
    if (description === "" || description === null) {
      return `${t("viewcard.no-description")}`;
    } else {
      return description;
    }
  }

  function renderDeadline() {
    if (isDeadline === "true") {
      return (
        <div id="datepicker" type="date">
          <DatePickerComponent readMode={true} update={false}/>
        </div>
      );
    } else {
      return (
        <Form.Control
          readOnly
          value={t("viewcard.no-deadline")}
          id="datepicker"
          className="cardDescriptionBox fw-bold"
          type="text"
        />
      );
    }
  }

  return (
    <>
      {/* Modal para ver tarjetas */}
      <Modal show={show} onHide={onHide} centered>
        {/* Formulario deshabilitado para consultar tarjetas */}
        <Form>
          <fieldset disabled={true}>
            {/* Componete header del modal, conteniendo el titulo de la tarjeta */}
            <Modal.Header className="bg-success text-white">
              <Modal.Title>
                <h2 className="fw-bold">
                  {getTitle(cardDetails.data ? cardDetails.data.title : "")}
                </h2>
              </Modal.Title>
            </Modal.Header>
            {/* Componente body del modal, conteniendo el resto del formulario */}
            <Modal.Body>
              {/* Componente para el estado de la tarjeta, solo se renderiza si la tarjeta esta bloqueada */}
              {isBloqued ? (
                <h2
                  className="cardInputBox rounded mb-2 bg-danger fw-bold text-white"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("viewcard.card-blocked")}
                </h2>
              ) : null}
              {/* Componente que contiene el dropdown para visualizar propietario */}
              <InputGroup className="mb-2">
                <InputGroup.Text className="fw-bold">
                  {t("insertcard.card-owner")}
                </InputGroup.Text>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="primary drop1 fw-bold"
                    style={{
                      width: "fit-content",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cardDetails.data
                      ? getCorrectUsername(
                          getShortName(
                            getUsername(cardDetails.data.owner_user_id)
                          )
                        )
                      : ""}
                  </Dropdown.Toggle>
                </Dropdown>
              </InputGroup>
              {/* Componente que contiene la informacion de duedate */}
              <InputGroup className="mb-2">
                <InputGroup.Text className="fw-bold">
                  {t("insertcard.due-date")}
                </InputGroup.Text>
                {renderDeadline()}
              </InputGroup>
              {/* Componente que contiene la informacion de la columna */}
              <InputGroup className="mb-2">
                <InputGroup.Text className="fw-bold">
                  {t("insertcard.workflow")}
                </InputGroup.Text>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="primary drop1 fw-bold"
                    style={{
                      width: "fit-content",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getShortName(cardColumn)}
                  </Dropdown.Toggle>
                </Dropdown>
              </InputGroup>
              {/* Componente que contiene la descripcion de la tarjeta */}
              <InputGroup className="mb-2">
                <InputGroup.Text className="fw-bold">
                  {t("insertcard.description")}
                </InputGroup.Text>
                <Form.Control
                  readOnly
                  dangerouslySetInnerHTML={{
                    __html: cardDetails.data
                      ? getDescription(
                          getCorrectDescription(cardDetails.data.description)
                        )
                      : "",
                  }}
                  // value={cardDetails.data ? getDescription(getCorrectDescription(cardDetails.data.description)) : ''}
                  className="cardDescriptionBox fw-bold"
                  type="text"
                  as="div"
                />
              </InputGroup>
            </Modal.Body>
          </fieldset>
          {/* Componente footer del modal, conteniendo los botones de editar y aceptar */}
          <Modal.Footer className="modalFooter">
            {/* <Button variant="primary fw-bold" onClick={onHide}>
              {t("viewcard.btn-edit")}
            </Button> */}
            <Button variant="primary fw-bold" onClick={onHide}>
              {t("viewcard.btn-accept")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ViewCardModal;
