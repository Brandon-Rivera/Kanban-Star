// Se importan las librerías y componentes necesarios
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MoveCardModal from "./MoveCardModal";
import CommentsModal from "./CommentsModal";
import ViewCardModal from "./ViewCardModal";
import UpdateCardModal from "./UpdateCardModal";

function CardMenu({
  show,
  title,
  onHide,
  dataWorkspace,
  workflowPos,
  idCard,
  cardName,
  columnCard, 
  cardWid,
  api,
}) {
  // Traducciones
  const [t] = useTranslation("global");

  // Estados para los modales
  const [modalShowMove, setModalShowMove] = useState(false);
  const [modalShowComments, setModalShowComments] = useState(false);
  const [comments, setComments] = useState({ data: [] });

  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  // Funcion que muestra el modal de consultar tarjetas
  const consultar = () => {
    setViewModalShow(true);
  };

  // Funcion que muestra el modal de mover tarjetas
  const mover = () => {
    setModalShowMove(true);
  };

  const actualizar = () => {
    setEditModalShow(true);
  };

  const comentarios = async () => {
    //Valores necesarios para la peticion get de workspace
    const values = {
      cardid: idCard,
    };

    //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
    const response = await fetch(`${api}/comment/get`, {
      headers: {
        "Content-Type": "application/json",
        'supra-access-token': localStorage.getItem('token')
      },
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setComments(data);

    setModalShowComments(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        className="text-center"
      >
        <Modal.Header className="bg-success">
          <Modal.Title className="fw-bold text-white">{title}</Modal.Title>
          <CloseButton onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="p-1">
          <Container>
            <Row>
              <Col className="p-1 m-1 d-flex justify-content-center">
                <Button
                  className="fw-bold text-dark border border-3 border-dark d-block w-100"
                  onClick={() => consultar()}
                >
                  {t("cardMenu.show")}
                </Button>
              </Col>
              <Col className="p-1 m-1 d-flex justify-content-center">
                <Button
                  className="fw-bold text-dark border border-3 border-dark d-block w-100"
                  onClick={() => mover()}
                >
                  {t("cardMenu.move")}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="p-1 m-1 d-flex justify-content-center">
                <Button
                  className="fw-bold text-dark border border-3 border-dark d-block w-100"
                  onClick={() => actualizar()}
                >
                  {t("cardMenu.update")}
                </Button>
              </Col>
              <Col className="p-1 m-1 d-flex justify-content-center">
                <Button
                  className="fw-bold text-dark border border-3 border-dark d-block w-100"
                  onClick={() => comentarios()}
                >
                  {t("cardMenu.comment")}
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Modales */}
      <MoveCardModal 
        show={modalShowMove} 
        onHide={() => setModalShowMove(false)} 
        dataWorkspace={dataWorkspace} 
        workflowPos={workflowPos} 
        cardid={idCard} 
        cardWid={cardWid} 
        api={api}
      />
      <CommentsModal
        show={modalShowComments}
        onHide={() => setModalShowComments(false)}
        cardID={idCard}
        cardName={cardName}
        api={api}
        comments={comments}
        getComments={comentarios}
      />
      <ViewCardModal
        show={viewModalShow}
        onHide={() => setViewModalShow(false)}
        cardColumn={columnCard}
      />
      <UpdateCardModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        api={api}
      />
    </>
  );
}

export default CardMenu;
