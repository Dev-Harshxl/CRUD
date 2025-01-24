import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Modalbox = ({ show, onClose, onConfirm, itemId }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this item?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm(itemId);
            onClose(); 
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalbox;
