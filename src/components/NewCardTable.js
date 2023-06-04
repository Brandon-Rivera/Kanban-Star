import React, { useState, useEffect, useContext } from "react";
import { Container, ListGroup } from "react-bootstrap";
import nextArrow from "../images/nextArrow.png";
import WFace from "../images/blank-face.jpeg";
import CardMenu from "./CardMenu";
import "./css/NewCardTable.css";
import { useTranslation } from "react-i18next";
import { CiSquareChevDown } from "react-icons/ci";
import { DataContext } from "../Contexts/DataContext";
import findNextColumn from "../utils/findNextColumn";
import getDeadline from "../utils/getDeadline";
import ErrorCardModal from "./ErrorCardModal";
import SuccessCardModal from "./SuccessCardModal";
import ConfirmCardModal from "./ConfirmCardModal";

function NewCardTable({
  id,
  nCard,
  cols,
  duedate,
  idOwner,
  index,
  Idworkflow,
  workflowPos,
  dataWorkspace,
  nameCol,
  api,
  colId,
}) {
  const [own, setOwn] = useState("");
  const [ram, setRam] = useState({});
  const [showCardMenu, setShowCardMenu] = useState(false);
  const [t] = useTranslation("global");
  const { moveCard, updateDataC, dataW, moveCardInfo, updateMoveCardInfo } =
    useContext(DataContext);
  const laneId = dataW?.data[workflowPos]?.lanes[0]?.id;
  const [errModal, setErrModal] = useState(false);
  const [errModal2, setErrModal2] = useState(false);
  const [resModal, setResModal] = useState(false);
  const [errModal3, setErrModal3] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const [isFlipped, setIsFlipped] = useState(false);

  // const handleFlip = () => {
  //     setIsFlipped(!isFlipped);
  // };

  useEffect(() => {
    const ownersjs = JSON.parse(localStorage.getItem("owners"));
    setOwn(ownersjs.data.find((data) => data.user_id === idOwner));
  }, [idOwner]);

  // Petición para obtener los detalles de una tarjeta
  // Una vez que se obtienen los datos, se muestra el modal CardMenu
  const getCardDetails = async (id) => {
    const response = await fetch(`${api}/card`, {
      headers: {
        "Content-Type": "application/json",
        "supra-access-token": localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        cardid: id,
      }),
    });
    const data = await response.json();
    updateDataC(data.data);
    setShowCardMenu(true);
  };

  // Funcion que envia la peticion para
  // mover la tarjeta a la siguiente columna
  const handleCardMoveAPI = async (confirmMove) => {
    if (confirmMove) {
      const { adjacentColumnID, adjacentSubcolumnID } = findNextColumn(
        cols,
        colId
      );
      let nextColId = null;

      if (adjacentSubcolumnID === null) {
        nextColId = adjacentColumnID;
      } else {
        nextColId = adjacentSubcolumnID;
      }

      const values = {
        cardid: id,
        columnid: nextColId,
        workflowid: Idworkflow,
        laneid: laneId,
      };

      // Funcion que manda la petición tipo POST para mover la tarjeta
      const response = await fetch(`${api}/update/move`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "supra-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.error) {
        console.log("ram", ram);

        if (
          data.error.message ===
          `The card with id ${id} cannot be moved because it is blocked.`
        ) {
          setErrModal(true);
        }
        else if (data.error.code === "C191") {
          setErrModal2(true);
        }
      } else {
        const oldCard = {
          id: id,
          workflow_id: Idworkflow,
          column_id: colId,
        };
        const newCard = {
          id: data?.data[0].card_id,
          name: data?.data[0].title,
          description: data?.data[0].description,
          owner_id: data?.data[0].owner_user_id,
          duedate: getDeadline(data?.data[0].deadline),
          workflow_id: data?.data[0].workflow_id,
          column_id: data?.data[0].column_id,
          pos: null,
        };
        updateMoveCardInfo(oldCard, newCard);
        setResModal(true);
      }
    } else {
      setErrModal3(true);
    }
  };

  const handleLocalMove = () => {
    moveCard(moveCardInfo.oldCard, moveCardInfo.newCard);
  };

  return (
    <>
      <Container fluid className="px-0 p-1">
        <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item className="d-flex justify-content-between">
            <p className="m-0 fw-bold">{id}</p>
            <p className="m-0 fw-bold">{index}</p>
            <p className="m-0 fw-bold">{Idworkflow}</p>
            <p className="m-0 fw-bold">{own ? own.realname : "Sin Asignar"}</p>
          </ListGroup.Item>
          <ListGroup.Item
            className="d-flex justify-content-between custom-container"
            action
            onClick={() => {
              getCardDetails(id);
            }}
          >
            <p className="m-0 fw-bold">{nCard}</p>
            <img
              src={own ? (own.avatar == null ? WFace : own.avatar) : WFace}
              className="img-thumbnail rounded-circle border-0"
              alt="Foto"
            />
          </ListGroup.Item>
          <ListGroup.Item className="text-start">
            <p className="m-0 fw-bold">
              Fecha Limite:{" "}
              <span className="fw-normal">
                {duedate ? duedate : "Sin Fecha"}
              </span>
            </p>
          </ListGroup.Item>
          <ListGroup.Item action href="#link1" className="text-center">
            Seleccionar Flujo De Trabajo
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#link2"
            className="d-flex align-items-center justify-content-center"
            onClick={() => setShowConfirmModal(true)}
            style={{ backgroundColor: "#42AD49" }}
          >
            <img
              style={{ width: "2rem", height: "2rem" }}
              src={nextArrow}
              alt="nextArrrow"
            ></img>
          </ListGroup.Item>
        </ListGroup>
      </Container>
      <CardMenu
        show={showCardMenu}
        onHide={() => setShowCardMenu(false)}
        title={t("cardMenu.title")}
        dataWorkspace={dataWorkspace}
        workflowPos={workflowPos}
        idCard={id}
        cardName={nCard}
        columnCard={nameCol}
        cardWid={colId}
        api={api}
      />
      <ErrorCardModal
        show={errModal}
        onHide={() => setErrModal(false)}
        title={t("move.title-err")}
        message={t("move.message-block")}
        button={t("move.button-close")}
      />
      <ErrorCardModal
        show={errModal2}
        onHide={() => setErrModal2(false)}
        title={t("move.title-err")}
        message={t("move.message-ac")}
        button={t("move.button-close")}
      />
      <SuccessCardModal
        show={resModal}
        onHide={() => setResModal(false)}
        onConfirm={handleLocalMove}
        title={t("move.title-res")}
        message={t("move.message-res")}
        button={t("move.button-close")}
      />

      <ErrorCardModal
        show={errModal3}
        onHide={() => setErrModal3(false)}
        title={t("move.title-err")}
        message={t("move.message-err")}
        button={t("move.button-close")}
      />
      <ConfirmCardModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleCardMoveAPI}
        title={t("move.title-conf")}
        message={t("move.message-conf")}
        acceptButton={t("move.button-accept")}
        denyButton={t("move.button-cancel")}
      />
    </>
  );
}

export default NewCardTable;
