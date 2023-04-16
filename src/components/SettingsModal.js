import "./SettingsModal.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Table } from "react-bootstrap";
import { IoLanguage, IoColorPalette } from "react-icons/io5";
import {MdPreview} from "react-icons/md"

import LanguageCheckbox from "./LanguageCheckbox";
import ColorCheckbox from "./ColorCheckbox";
import ViewCheckbox from "./ViewCheckbox";


const SettingsModal = ({show, onHide}) => {
    const [t] = useTranslation("global");

    return (
        <div className="modal">
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title className="title">{t("navbar.config")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table hover borderless>
                        <tbody>
                            <tr>
                                <th>
                                    {/*<HiLanguage color='black'/>*/}
                                    <IoLanguage size={25}/>
                                </th>
                                <th>{t("settings.lang")}</th>
                                <th>
                                    <LanguageCheckbox/>                                   
                                </th>
                            </tr>
                            <tr>
                                <th><IoColorPalette size={25}/></th>
                                <th>{t("settings.palette")}</th>
                                <th>
                                    <ColorCheckbox/>
                                </th>
                            </tr>
                            <tr>
                                <th><MdPreview size={25}/></th>
                                <th>{t("settings.view")}</th>
                                <th>
                                    <ViewCheckbox/>
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>{t("settings.save")}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SettingsModal;
