import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import './css/ResInsertCardModal.css'

// Funcion que contiene el componente del modal de exito al insertar una tarjeta
function ResInsertCardModal({ show, onHide }) {

    const [t] = useTranslation("global")
    return (
        <Modal
            show={show} 
            onHide={onHide}
            centered
            backdrop = 'static'>
            <Modal.Header className="modalHeader">
                <Modal.Title>
                    {t("insertcard.insert-success")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {t("insertcard.insert-message")}
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button onClick={onHide}>
                    {t("insertcard.insert-button")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ResInsertCardModal;