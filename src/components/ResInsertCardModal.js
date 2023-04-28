import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function ResInsertCardModal({ show, onHide }) {
    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>
                    Resultado
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                La tarjeta fue ***
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ResInsertCardModal;