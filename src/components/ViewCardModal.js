import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import DatePickerComponent from './DatePicker';
import getNameShort from "../utils/getNameShort";
import checkTypeError from "../utils/checkTypeError";
import getUsername from '../utils/getUsername'
import getCorrectDescription from "../utils/getCorrectDescription";

function ViewCardModal({ show, onHide, cardDetails, cardColumn }){
    const [t] = useTranslation("global");

    return(
        <>
            <Modal
                backdrop="static"
                show={show}
                onHide={onHide}
                centered>
                    <Form>
                        <fieldset disabled='false'>
                            <Modal.Header>
                                <Modal.Title>
                                    <Form.Control
                                        value={cardDetails.data ? cardDetails.data.title : ''}
                                        className='cardInputBox'
                                        type='text'
                                        size='lg'
                                    />
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text
                                        id="basic-addon1"
                                        className='insertDropdown'>
                                            {t("insertcard.card-owner")}
                                    </InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary drop1"
                                            style={{ width: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            >
                                            {cardDetails.data ? getNameShort(getUsername(cardDetails.data.owner_user_id)) : ''}
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </InputGroup>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text
                                        id="basic-addon1">
                                        {t("insertcard.due-date")}
                                    </InputGroup.Text>
                                    <div id="datepicker"
                                        value='05-08-2000'
                                        type='date'
                                        tabindex="-1"
                                        aria-disabled="disabled">
                                        <DatePickerComponent/>
                                    </div>
                                </InputGroup>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>
                                        {t("insertcard.workflow")}
                                    </InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary drop1"
                                            style={{ width: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            >
                                            { getNameShort(cardColumn) }
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </InputGroup>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>
                                        {t("insertcard.description")}
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={cardDetails.data ? getCorrectDescription(cardDetails.data.description) : ''}
                                        className='cardDescriptionBox'
                                        type="text"
                                    />
                                </InputGroup>
                            </Modal.Body>
                        </fieldset>
                        <Modal.Footer className='modalFooter'>
                            <Button
                            variant="primary"
                            onClick={onHide}
                            >
                                Aceptar
                            </Button>
                        </Modal.Footer>
                    </Form>
            </Modal>
        </>
    );
}

export default ViewCardModal;