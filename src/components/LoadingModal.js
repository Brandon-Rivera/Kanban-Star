import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap"

const LoadingModal = ({ show, title, message }) => {
    return (
        <Modal show={show} centered>
            <ModalHeader>
                <ModalTitle >
                    {title}
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
        </Modal>
    )
}

export default LoadingModal