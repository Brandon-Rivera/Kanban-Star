import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import "./css/CommentsModal.css";
import { useState } from "react";
import ErrorModal from "./ErrorModal";

const CommentsModal = ({
  show,
  onHide,
  cardID,
  cardName,
  api,
  comments,
  getComments,
}) => {
  const userID = localStorage.getItem("userid");
  const [newComment, setNewComment] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const insertInitialState = () => {
    setNewComment("");
  };

  /*Obtenemos owners del localStorage y comparamos sus IDs con el ID del autor
   de cada comentario para regresar el nombre del autor*/
  const cardOwners = JSON.parse(localStorage.getItem("owners"));
  const ownersArray = Object.values(cardOwners);
  const ownersBuenos = ownersArray[0];
  let author = "";

  const getAuthor = (authorID) => {
    ownersBuenos.forEach((owner) => {
      if (authorID === owner.user_id) {
        author = owner.realname;
      }
    });
  };

  //Convertimos la fecha de creación del comentario a el siguiente formato: YYYY/MM/DD HH:MM:SS
  const getDate = (commentDate) => {
    let cDate = new Date(commentDate);
    let z = cDate.getTimezoneOffset() * 60 * 1000;
    let localDate = cDate - z;
    localDate = new Date(localDate).toISOString().split(".")[0];
    localDate = localDate.replace("T", ", ").slice(0, 17);
    return localDate;
  };

  /*Por cada comentario, comparamos el id del autor de cada uno con el del actual usuario, 
  y aplicamos el estilo correspondiente a cada comentario*/

  let commentStyle = "";
  let authDateStyle = "";
  let authDatePosition = "";

  const getCommentStyle = (authorID) => {
    let authToString = authorID.toString();

    if (authToString === userID) {
      commentStyle = "ownComment";
      authDateStyle = "ownAuthorDate";
      authDatePosition = "ownAD";
    } else {
      commentStyle = "tp_comment";
      authDateStyle = "tp_authorDate";
      authDatePosition = "tp_AD";
    }
  };

  //Función que establece el comentario escrito en el form en un estado "newComment"
  const handleFormControlChange = (event) => {
    setNewComment(event.target.value);
  };

  // Funcion para hacer la peticion POST para insertar el comentario.
  const handleFormSubmit = async (e) => {
    const encodedText = newComment.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>');
    e.preventDefault();
    const values = {
      domain: localStorage.getItem("domain"),
      apikey: localStorage.getItem("apikey"),
      cardid: cardID,
      comment: encodedText,
    };
    if (newComment !== "") {
      const response = await fetch("http://localhost:3001/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.error) {
        setShowErrorModal(true);
      } else {
        insertInitialState();
        getComments();
      }
    } else {
      setErrorMessage("El comentario no puede estar vacío");
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} scrollable centered>
        <ModalHeader closeButton>
          <Modal.Title className="modalTitle">
            Comentarios de la tarjeta {cardName} ({cardID})
          </Modal.Title>
        </ModalHeader>
        <ModalBody>
          {comments.data.map((comment) => (
            <>
              {getCommentStyle(comment.author.value)}
              <div className={authDatePosition}>
                <div className={authDateStyle}>
                  {getAuthor(comment.author.value)}
                  {author}
                  <br></br>
                  {getDate(comment.created_at)}
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: comment.text }}
                className={commentStyle}
              ></div>
              <br></br>
            </>
          ))}
        </ModalBody>
        <ModalFooter className="footer">
          <Form className="commentForm" onSubmit={handleFormSubmit}>
            <FormControl
              as="textarea"
              rows={3}
              className="commentForm"
              value={newComment}
              onChange={handleFormControlChange}
              // style={{ whiteSpace: "pre-wrap" }}
            ></FormControl>
            <br></br>
            {/* <Button onClick={onHide}>Salir</Button> */}
            <Button type="submit">Añadir comentario</Button>
          </Form>
        </ModalFooter>
      </Modal>
      <ErrorModal
        show={showErrorModal}
        title="Error"
        message={errorMessage}
        onHide={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default CommentsModal;
