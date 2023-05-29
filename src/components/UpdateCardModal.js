import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import DatePickerComponent from "./DatePicker";
import SuccessCardModal from "./SuccessCardModal";
import ErrorCardModal from "./ErrorCardModal";
import ConfirmCardModal from "./ConfirmCardModal";
import getShortName from "../utils/getShortName";
import getUsername from "../utils/getUsername";
import { DataContext } from "../Contexts/DataContext.js";
import getCorrectDate from "../utils/getCorrectDay";
import "./css/InsertCardModal.css";

function UpdateCardModal({ show, onHide, api }) {
  // Variable que contiene el mapa de traducciones
  const [t] = useTranslation("global");

  // Variable que contiene cardDetails
  const { dataC, dataOw, updateCard, updateDataC } = useContext(DataContext);

  // Asignar hooks para los campos del formulario
  const [cardName, setCardName] = useState(dataC?.title);
  const [cardOwnerId, setCardOwnerId] = useState(dataC?.owner_user_id);
  const [ownerUsername, setOwnerUsername] = useState(
    getCorrectUsername(getShortName(getUsername(cardOwnerId, dataOw)))
  );
  const [cardDueDate, setCardDueDate] = useState(dataC?.deadline);
  const [cardDescription, setCardDescription] = useState(
    parseDescription(dataC?.description)
  );
  const [cardId, setCardId] = useState(dataC?.card_id);
  const [confirmModal, setConfirmModal] = useState(false);

  // Modales de respuesta y error
  const [resModal, setResModal] = useState(false);
  const [errModal, setErrModal] = useState(false);

  // Funcion que devuelve el username del owner de la tarjeta
  function getCorrectUsername(username) {
    if (username === "" || username === null) {
      return `${t("insertcard.choose-owner")}`;
    } else {
      return username;
    }
  }

  // Funcion que devuelve la descripcion de la tarjeta sin etiquetas html
  function parseDescription(description) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(description, "text/html");
    const parsedText = parsedHtml.activeElement.innerText;
    return parsedText;
  }

  // Funcion que muestra el modal de confirmación
  function confirmUpdate() {
    setConfirmModal(true);
  }

  // Recarga el modal cada vez que se accede a una nueva tarjeta
  useEffect(() => {
    setCardName(dataC?.title);
    setCardOwnerId(dataC?.owner_user_id);
    setOwnerUsername(
      getCorrectUsername(
        getShortName(getUsername(dataC?.owner_user_id, dataOw))
      )
    );
    setCardDueDate(dataC?.deadline);
    setCardDescription(parseDescription(dataC?.description));
    setCardId(dataC?.card_id);
  }, [dataC]);

  // Funcion para hacer la peticion POST para actualizar la tarjeta
  // Recibe la confirmacion del modal
  async function handleUpdateSubmit(confirmUpdate) {
    if (confirmUpdate) {
      const values = {
        cardid: cardId,
        title: cardName,
        description: "<p>" + cardDescription + "</p>",
        ownerid: cardOwnerId,
        duedate: getCorrectDate(cardDueDate),
      };
      try {
        // Funcion que manda la petición tipo POST para actualizar la tarjeta
        const response = await fetch(`${api}/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "supra-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        const newCard = {
          id: cardId,
          name: cardName,
          description: "<p>" + cardDescription + "</p>",
          owner_id: cardOwnerId,
          duedate: cardDueDate,
          workflow_id: dataC?.workflow_id,
          column_id: dataC?.column_id,
        };
        updateDataC(data.data[0]);
        updateCard(newCard);
        setResModal(true);
        onHide();
      } catch (error) {
        console.log(error);
        setErrModal(true);
      }
    } else {
      console.log(1);
      setErrModal(true);
    }
  }

  return (
    <>
      <Modal
        backdrop="static"
        show={show}
        onHide={() => {
          onHide();
        }}
        centered
      >
        {/* Componente de tipo Form */}
        <Form onSubmit={handleUpdateSubmit}>
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
                  title={ownerUsername}
                  value={cardOwnerId}
                  variant="primary drop1 fw-bold"
                  style={{
                    width: "fit-content",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getShortName(ownerUsername)}
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
                        setCardOwnerId(data.user_id);
                        setOwnerUsername(data.username);
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
                <DatePickerComponent readMode={false} update={true} />
              </div>
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
            <Button
              variant="primary fw-bold"
              onClick={() => {
                onHide();
                confirmUpdate();
              }}
            >
              {t("updatecard.btn-accept")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modales de respuesta y error */}
      <SuccessCardModal
        show={resModal}
        onHide={() => setResModal(false)}
        title={t("updatecard.modal-title")}
        message={t("updatecard.modal-success")}
        button={t("updatecard.modal-accept")}
      />
      <ErrorCardModal
        show={errModal}
        onHide={() => setErrModal(false)}
        title={t("updatecard.modal-title")}
        message={t("updatecard.modal-error")}
        button={t("updatecard.modal-accept")}
      />
      <ConfirmCardModal
        show={confirmModal}
        onHide={() => setConfirmModal(false)}
        onConfirm={handleUpdateSubmit}
        title={t("updatecard.modal-title")}
        message={t("updatecard.modal-description")}
        acceptButton={t("updatecard.btn-accept")}
        denyButton={t("updatecard.btn-cancel")}
      />
    </>
  );
}

export default UpdateCardModal;
