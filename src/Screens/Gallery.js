import React, { useState } from 'react';
import { Nav, Navbar, Container, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShowImages from '../Components/ShowImages';
import ImgUpload from '../Components/ImgUpload';




export default function Gallery() {
  const [showModal, setShowModal] = useState(false);
  const [albumName, setAlbumName] = useState('');

  const handleCreateAlbum = () => {
    // Add your logic here to handle album creation
    console.log('Creating album:', albumName);

    // Close the modal after album creation
    setShowModal(false);
    setAlbumName('');
  };

  return (
    <>
      <Navbar bg="warning" variant="dark" expand="lg" >
        <Navbar.Brand href="#home" style={{ fontWeight: 'bold', fontSize: '35px', margin: '0 0 0 20px' }} >Gallery</Navbar.Brand>
        <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <Link to="/myAlbums" className="nav-link" style={{ color: 'white', fontSize: '23px', margin: '0 0 0 20px' }}>My Albums</Link>
            </Nav>

            <ImgUpload></ImgUpload>
            <Nav>
              <Link to="/" className="nav-link">
                <Button variant="danger">Logout</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    

      <ShowImages></ShowImages>
    
    </>
  );
}
