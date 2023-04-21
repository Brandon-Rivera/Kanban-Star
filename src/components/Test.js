import React, { useState } from 'react'
import MenuTarjetas from './MenuTarjetas';
import Button from 'react-bootstrap/Button';


function Test() {

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>

            <Button onClick={() => setModalShow(true)}>Menu tarjetas</Button>

            <MenuTarjetas show={modalShow} title='Error de inicio de sesión!' message='Usuario, contraseña o dominio incorrectos' onHide={() => setModalShow(false)} />

        </div>
    )
}

export default Test