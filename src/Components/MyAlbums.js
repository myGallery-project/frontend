import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CreateAlbum from './CreateAlbum';
import { Nav, Navbar, Container, Button, Modal, Form,  Row, Col, } from 'react-bootstrap';

function MyAlbums() {
  const authToken = localStorage.getItem('token');
  const { albumId } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const email = "hariompatel127@gmail.com";
      const response = await axios.get(`http://localhost:5000/api/getAlbums/${email}`, {
        headers: {
          authorization: `${authToken}`,
        },
      });
      setAlbums(response.data.albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  return (
    <>
  <Navbar bg="warning" variant="dark" expand="lg" >
       
        <Link to="/Gallery" className="nav-link">
        <Navbar.Brand  style={{ fontWeight: 'bold', fontSize: '35px', margin: '0 0 0 20px' }} >Gallery</Navbar.Brand>
        </Link>
        
        <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              {/* <Link to="/myAlbums" className="nav-link" style={{ color: 'white', fontSize: '23px', margin: '0 0 0 20px' }}>My Albums</Link> */}
              <CreateAlbum></CreateAlbum>
            </Nav>

            
            <Nav>
              <Link to="/" className="nav-link">
                <Button variant="danger">Logout</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   

    <Container>
      <Row className="mt-4">
        {albums.map((album) => (
          <div key={album._id} md={4} className="mb-4  text-secondary display-flex">
              <h3>{album.name}</h3>
              <Link to={`/viewAlbum/${album._id}`}>
                <Button variant="primary">View Album</Button>
              </Link>
          </div>
        ))}
      </Row>
    </Container>
    </>
  );
}

export default MyAlbums;
