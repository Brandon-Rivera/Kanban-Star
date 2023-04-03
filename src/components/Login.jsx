import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import './Login.css'
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";


export const Login = (props) => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [domain, setDomain] = useState('');
    const [t, i18n] = useTranslation("global");
    const [isChecked, setIsChecked] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('isChecked'));
        return savedState ?? false;
      });  

    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            i18n.changeLanguage("en");
        }
        else{
            i18n.changeLanguage("es");
        }
    }

    useEffect(() => {
        localStorage.setItem('isChecked', JSON.stringify(isChecked));
      }, [isChecked]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: email,
            pass: pass,
            domain: domain
        };
        console.log(values);

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
            navigate('/workspace');
        }

        console.log(data);
    }

    

    return (
        <div className="auth-form-container">
        <center className="language-button">
            <label className="switch">
                <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} ></input>
                <label for="language-toggle"></label>
                <span className="on">ES</span>
                <span className="off">EN</span>
            </label>
        </center>
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
                <label/>
                <button type="submit">{t("login.login")}</button>
            </form>
            <ErrorModal show={modalShow} title='Error máster!' message='Usuario, contraseña o dominio incorrectos' onHide={() => setModalShow(false)} />
        </div>
    )
}