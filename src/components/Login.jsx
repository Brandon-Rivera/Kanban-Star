import React, { useState } from "react";
import './Login.css'
import LanguageCheckbox from "./LanguageCheckbox";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

//import { changeLanguage } from "i18next";


export const Login = (props) => {

    // Asignacion de variables y hooks
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [t] = useTranslation("global");

    //Funcion para mandar peticion de login al API
    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: email,
            pass: pass,
            domain: domain
        };

        const response = await fetch(`http://localhost:3001/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

        const data = await response.json();

        if (data.status === false) {
            setModalShow(true);
        }
        else {
            localStorage.setItem('apikey', data.apikey);
            localStorage.setItem('domain', data.companyname);
            localStorage.setItem('userid', data.userid);
            navigate('/workspace');
        }

    }

    return (
        <div className="App">
            <div className="auth-form-container">

                {/* Boton para cambiar de español a ingles */}
                <center className="language-checkbox">
                    <LanguageCheckbox/>
                </center>

                {/* Formulario de inicio de sesion */}
                <h1 className="derecha">{t("login.hello")}</h1>
                <h1>{t("login.welcome")}</h1>
                <h2>{t("login.login-with-credentials")}</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">{t("login.e-mail")}</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t("login.e-mail-placeholder")} id="email" name="email" />
                    <label htmlFor="password">{t("login.password")}</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="pass" name="pass" />
                    <label htmlFor="username">{t("login.domain")}</label>
                    <input value={domain} onChange={(e) => setDomain(e.target.value)} type="username" placeholder={t("login.domain-placeholder")} id="domain" name="domain" />
                    <Button type="submit" variant="dark">{t("login.login")}</Button>
                </form>

                {/* Boton para explicar el dominio */}
                <Button variant="dark" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                    {t("login.WhatDomain")}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        {t("login.DescDomain")}
                    </div>
                </Collapse>

                {/* Modal que avisa al usuario cuando tiene un error en el inicio de sesión */}
                <ErrorModal show={modalShow} title='Error de inicio de sesión!' message='Usuario, contraseña o dominio incorrectos' onHide={() => setModalShow(false)} />
            </div>
        </div>
    )
}
