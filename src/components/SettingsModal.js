import "./css/SettingsModal.css";
import { useTranslation } from "react-i18next";
import { Modal, Button, Table } from "react-bootstrap";
import { IoLanguage, IoColorPalette } from "react-icons/io5";
import {MdPreview} from "react-icons/md"
//Importación de los toggles de configuración
import LanguageCheckbox from "./LanguageCheckbox";
import ColorCheckbox from "./ColorCheckbox";
import ViewCheckbox from "./ViewCheckbox";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { LanguageCheckedContext } from "../Contexts/LanguageCheckedContext";
import { ColorCheckedContext} from "../Contexts/ColorCheckedContext";
import { ViewContext } from "../Contexts/ViewContext";
import { ViewCheckedContext } from "../Contexts/ViewCheckedContext";
import { useNavigate } from "react-router-dom";


const SettingsModal = ({show, onHide}) => {
    const [t, i18n] = useTranslation("global");
    const navigate = useNavigate();

    const {theme, setTheme} = useContext(ThemeContext);
    const {view, setView} = useContext(ViewContext)
    const {setLanguageChecked} = useContext(LanguageCheckedContext);
    const {setColorChecked} = useContext(ColorCheckedContext);
    const {setViewChecked} = useContext(ViewCheckedContext);

    const resetLanguage = () => {
        //Reseteamos idioma al que estaba antes de cambiarlo en el modal.
        const currentLanguage = localStorage.getItem("CurrentLanguage");
        i18n.changeLanguage(currentLanguage);
        //Reseteamos el checkbox
        (currentLanguage === "en" ? setLanguageChecked(true) : setLanguageChecked(false));
    }

    const resetTheme = () => {
        //Reseteamos tema al que estaba antes de cambiarlo en el modal.
        const currentTheme = localStorage.getItem("CurrentTheme");
        setTheme(currentTheme);
        //Reseteamos el checkbox
        (currentTheme === "dark" ? setColorChecked(true) : setColorChecked(false));
    }

    const resetView = () => {
        //Reseteamos vista a la que estaba antes de cambiarlo en el modal.
        const currentView = localStorage.getItem("CurrentView");
        setView(currentView);
        //Reseteamos el checkbox
        (currentView === "/newboard" ? setViewChecked(true) : setViewChecked(false));
    }

    const handleClose = () => {
        resetLanguage();
        resetTheme();
        resetView();
        onHide();
    }

    const handleSave = () => {
        const currentView = localStorage.getItem("CurrentView");
        if(view !== currentView){
            navigate(view);
        }
        onHide();
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} id={theme}>
                <Modal.Header className="modal-header">
                    <Modal.Title className="title">{t("navbar.config")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Table hover borderless>
                        <tbody>
                            <tr>
                                <th>
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
                <Modal.Footer className="modal-footer">
                    <Button variant="danger" onClick={() => handleClose()}>{t("settings.close")}</Button>
                    <Button variant="primary" onClick={() => handleSave()}>{t("settings.save")}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default SettingsModal;
