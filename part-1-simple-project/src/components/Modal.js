import Modal from "react-bootstrap/Modal";
import Button from "./Button";
export default function MyModal(props, children) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{props.title}</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.children}</Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide} bgColor="green" textColor="#fff">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
