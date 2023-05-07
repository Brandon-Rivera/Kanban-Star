 import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import DOMPurify from 'dompurify';
 
 const CommentsModal = ({show, onHide, cardID, api}) => {

  const [comments, setComments] = useState({data: []});

  useEffect(() => {

    //Valores necesarios para la peticion get de workspace
    const values = {
        domain: localStorage.getItem('domain'),
        apikey: localStorage.getItem('apikey'),
        cardid: cardID
    }

    //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
    const getComments = async () => {

        const response = await fetch("http://localhost:3001/comment/get", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(values)
        })
        const data = await response.json()
        setComments(data)
    }

    //llamada a la funcion
    getComments()
}, [api, cardID])

   return (
     <Modal show={show} onHide={onHide}>
      <ModalHeader>
        Comentarios
      </ModalHeader>
      <ModalBody>
        {
          comments.data.map(comment => (
              <div>
                Author: {comment.author.value}
                Date: {comment.created_at}
                <br></br>
                {comment.text.replace(/<\/?p[^>]*>|&nbsp;|&lt;|&gt;|amp;/g, '')}
                <br></br>
                CardID: {cardID}
              </div>        
          ))
        }
      </ModalBody>
      <ModalFooter>
        <Button onClick={onHide}>Salir</Button>
        <Button>Añadir comentario</Button>
      </ModalFooter>
     </Modal>
   )
 }
 
 export default CommentsModal