import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateAlbum = () => {
  const [albumName, setAlbumName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const authToken = localStorage.getItem('token');

  const handleCreateAlbum = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/createAlbum', {
        albumName,
      }, {
        headers: {
          authorization: `${authToken}`,
        },
      });
      console.log('Album created:', response.data);
      // Clear the input field after successful album creation
      setAlbumName('');
      // Close the modal after album creation
      setShowModal(false);
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  return (
    <div>
     
      <Button varient = "danger" onClick={() => setShowModal(true)}>Create Album</Button>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-primary text-light'>
          <Modal.Title>Create Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formAlbumName">
            <Form.Label><h3>Album Name:</h3> </Form.Label>
            <Form.Control
              type="text"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleCreateAlbum}>
            Create
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateAlbum;
