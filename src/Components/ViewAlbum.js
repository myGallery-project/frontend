import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ViewAlbum() {
  const [album, setAlbum] = useState(null);
  const { email, albumId } = useParams();
  const authToken = localStorage.getItem('token');
  
  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    try {
      // Fetch album details from the server using email and album ID
      // const email = "hariompate127@gmail.com"
      const response = await axios.get(`http://localhost:5000/api/getAlbum/${email}/${albumId}` , {
        headers: {
          authorization: `${authToken}`,
        },
      });
      setAlbum(response.data.album);
    } catch (error) {
      console.error('Error fetching album:', error);
    }
  };

  return (
    <Container>
      {album ? (
        <div>
          <h2 className="text-center mt-4">Album: {album.name}</h2>
          <Row className="justify-content-center mt-4">
            {album.images.map((image) => (
              <Col key={image._id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={`http://localhost:5000/api/upload/${image.img}`} />
                  <Card.Body>
                    <Card.Title>Image: {image.img}</Card.Title>
                    <Card.Text>
                      Likes: {image.likes}
                    </Card.Text>
                    <ul>
                      {image.comments.map((comment) => (
                        <li key={comment._id}>
                          <strong>{comment.commenterName}:</strong> {comment.comment}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default ViewAlbum;
