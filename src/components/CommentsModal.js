import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import './css/CommentsModal.css'
 
 const CommentsModal = ({show, onHide, cardID, api, comments}) => {

  const userID = localStorage.getItem('userid');
  

  /*Obtenemos owners del localStorage y comparamos sus IDs con el ID del autor
   de cada comentario para regresar el nombre del autor*/
  const cardOwners = JSON.parse(localStorage.getItem('owners'));
  const ownersArray = Object.values(cardOwners);
  const ownersBuenos = ownersArray[0];
  let author = "";

  const getAuthor = (authorID) => {
    ownersBuenos.forEach(owner => {
      
        if(authorID === owner.user_id){
          author = owner.realname;
        }
      
    });
  }

  //Convertimos la fecha de creación del comentario a el siguiente formato: YYYY/MM/DD HH:MM:SS
  const getDate = (commentDate) => {
    let cDate = new Date(commentDate);
    let z = cDate.getTimezoneOffset() * 60 * 1000;
    let localDate = cDate-z;
    localDate = new Date(localDate).toISOString().split(".")[0];
    localDate = localDate.replace('T', ' ');
    return localDate;
  }

/*Por cada comentario, comparamos el id del autor de cada uno con el del actual usuario, 
y aplicamos el estilo correspondiente a cada comentario*/

  let commentStyle = "";
  let authDateStyle = "";

  const getCommentStyle = (authorID) => {
    let authToString = authorID.toString();
      
      (authToString === userID ? commentStyle = "ownComment" : commentStyle = "tp_comment");
      (authToString === userID ? authDateStyle = "ownAuthorDate" : authDateStyle = "tp_authorDate");
  }

   return (
     <Modal show={show} onHide={onHide} scrollable centered>
      <ModalHeader>
        Comentarios de CardID: {cardID}
      </ModalHeader>
      <ModalBody>
        {
          comments.data.map(comment => (
            <>
            {getCommentStyle(comment.author.value)}
              <div className={authDateStyle}>
                {getAuthor(comment.author.value)}
                {author} 
                <br></br>
                {getDate(comment.created_at)}
              </div>
              
              <div dangerouslySetInnerHTML={{__html:comment.text}} className={commentStyle}>
              </div>    
              <br></br>
           </>
          ))
        }
      </ModalBody>
      <ModalFooter>
        <div>
          Input
        </div>
        <Button onClick={onHide}>Salir</Button>
        <Button>Añadir comentario</Button>
      </ModalFooter>
     </Modal>
   )
 }
 
 export default CommentsModal