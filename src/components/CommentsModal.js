import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import LoadingModal from "./LoadingModal";
import {AiOutlineFileAdd} from 'react-icons/ai'
import "./css/CommentsModal.css";
import { useContext, useState, useRef, useEffect } from "react";
import ErrorCardModal from "./ErrorCardModal";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../Contexts/ThemeContext";

const CommentsModal = ({
  show,
  onHide,
  cardID,
  cardName,
  api,
  comments,
  getComments,
}) => {

  const [t] = useTranslation("global");
  const { theme } = useContext(ThemeContext);
  const userID = localStorage.getItem("userid");
  //Estados
  const [newComment, setNewComment] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFiles, setUserFiles] = useState([]);
  const [labelText, setLabelText] = useState(t("comments.file-input"));
  const [filesNamesAndLinks, setFilesNamesAndLinks] = useState([]);

  const divRef = useRef(null);

  //Función para que aparezcan los comentarios más recientes en el modal cuando se abre.
  const scrollDown = () => {
    if (show) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollDown();
  });

  useEffect(() => {
    setLabelText(t("comments.file-input"));
  },[t]);

  const insertInitialState = () => {
    setLabelText(t("comments.file-input"))
    setNewComment("");
    setUserFiles([]);
    setFilesNamesAndLinks([]);
  };

  const exitModal = () => {
    insertInitialState();
    onHide();
  }

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
  //Función que establece el los archivos adjuntos en el form en un estado "newComment"
  const handleFileControlChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setLabelText(selectedFiles.length + t("comments.file-selected"));
    setUserFiles(selectedFiles);
  }

  //Cada que se adjuntan archivos, se mandan a la base de datos y se obtiene su link
  useEffect(() => {
  }, [userFiles])

  const getFileLinks = async () => {
    setErrorMessage("hola");
    const filesLength = userFiles.length;
    for (let i = 0; i < filesLength; i++) {

      const formData = new FormData();
      formData.append("toUpload", userFiles[i]);
      formData.append("cardid", cardID);

      const response = await fetch(`${api}/upload`, {
        method: "POST",
        headers: {
          'supra-access-token': localStorage.getItem('token')
        },
        body: formData
      })

      if (!response.ok) {
        if (response.status === 413) {
          setErrorMessage(t("comments.error-413"));
        }
        else{
          setErrorMessage(t("comments.error-file"));
        }
        setShowErrorModal(true);
        setIsLoading(false);
        insertInitialState();
      }
      else {
        const data = await response.json();
        const fileNameAndLink = {
          file_name: userFiles[i].name,
          link: data
        }
        filesNamesAndLinks.push(fileNameAndLink);
      }
    }
  }

  // Funcion para hacer la peticion POST para insertar el comentario.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const encodedText = newComment
      .replace(/ /g, "&nbsp;")
      .replace(/\n/g, "<br/>");

    const values = {
      cardid: cardID,
      comment: encodedText,
      files: filesNamesAndLinks
    };
    if (userFiles.length !== 0) {
      setIsLoading(true);
    }
    await getFileLinks();
    if (newComment !== "" || filesNamesAndLinks.length !== 0) {
        const response = await fetch(`${api}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'supra-access-token': localStorage.getItem('token')
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (data.error) {
          setShowErrorModal(true);
          setIsLoading(false)
        } else {
          setIsLoading(false);
          insertInitialState();
          getComments();
        }
    }
      else if(userFiles.length === 0 && newComment === ""){
        setErrorMessage(t("comments.empty"));
        setShowErrorModal(true); 
      }
  };

  //Itera por cada attachment del comentario y muestra su nombre en forma de link para descargar.
  const showAttachments = (attachments) => {
    if (attachments.length !== 0) {
      return attachments.map(attachment => (
        <a key={attachment.id} href={attachment.link}>
          {attachment.file_name}&nbsp;&nbsp;
        </a>
      ));
    }
  }

  return (
    <>
      <Modal id={theme} show={show} onHide={onHide} scrollable centered>
        <ModalHeader className="modal-header">
          <Modal.Title className="modalTitle">
            {t("comments.title")}: {cardName} ({cardID})
          </Modal.Title>
        </ModalHeader>
        <ModalBody ref={divRef}>
          {comments.data.map((comment) => (
            <>
              {getCommentStyle(comment.author.value)}
              <div className={authDatePosition}>
                <div className={authDateStyle}>
                  {getAuthor(comment.author.value)}
                  {author}
                  <br></br>
                  <div className="dateComment">
                    {getDate(comment.created_at)}
                  </div>
                </div>
              </div>
              <div className={commentStyle}>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                ></div>
                <div>
                  {showAttachments(comment.attachments)}
                </div>
              </div>
              <br></br>
            </>
          ))}
        </ModalBody>
        <ModalFooter className="footer">
          <Form className="commentForm" onSubmit={handleFormSubmit}>
            <div className="formControlAndButton">
              <FormControl
                placeholder={t("comments.placeholder")}
                as="textarea"
                rows={3}
                className="commentForm"
                value={newComment}
                onChange={handleFormControlChange}
              ></FormControl>
              <Form.Label htmlFor="filesInput" id="filesInputLabel">
                <AiOutlineFileAdd/>&nbsp;
                {labelText}
              </Form.Label>
              <Form.Control type="file" multiple id="filesInput" onChange={handleFileControlChange}/>
            </div>
            <br></br>
            <div className="footerButtons">
              <Button onClick={() => exitModal()}>{t("comments.exit")}</Button>
              <Button type="submit">{t("comments.add")}</Button>
            </div>
          </Form>
        </ModalFooter>
      </Modal>
      <ErrorCardModal
        show={showErrorModal}
        title="Error"
        message={errorMessage}
        button={t("comments.accept")}
        onHide={() => setShowErrorModal(false)}
      />
      <LoadingModal
        show={isLoading}
        title = {t("loading.title")}
        message = {t("loading.comment")}
      />
    </>
  );
};

export default CommentsModal;
