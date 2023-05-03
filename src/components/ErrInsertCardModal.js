import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import './css/ErrInsertCardModal.css'

// Funcion que contiene el componente del modal de error al insertar una tarjeta
function ErrInsertCardModal({ show, onHide }) {

    const [t] = useTranslation("global")
    return (
        <Modal
            show={show} 
            onHide={onHide}
            centered
            backdrop = 'static'>
            <Modal.Header className="modalHeaderError">
                <Modal.Title>
                    {t("insertcard.insert-success-er")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {t("insertcard.insert-message-er")}
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button onClick={onHide}>
                    {t("insertcard.insert-button-er")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrInsertCardModal;