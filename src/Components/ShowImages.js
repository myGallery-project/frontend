
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

function ShowImages() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query for sender name
  const [imgSearchQuery, setImgSearchQuery] = useState(''); // Search query for image name
  const [albums, setAlbums] = useState([]);
  const [showAddToAlbumsModal, setShowAddToAlbumsModal] = useState(false);
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const authToken = localStorage.getItem('token');
 
  useEffect(() => {
    // Fetch images from the server when the component mounts
    fetchImages();
    // Fetch albums from the server when the component mounts
    fetchAlbums();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getImages');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchAlbums = async (email) => {
    try {
      
      const response = await axios.get(`http://localhost:5000/api/getAlbums/${email}`, {
        headers: {
          authorization: `${authToken}`,
        },
      });
      console.log(response.data.albums);
      setAlbums(response.data.albums);
      
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleDownload = (img) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/api/upload/${img}`;
    link.download = img;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  const handleAddToAlbums = (img) => {
    setSelectedImage(img);
    setShowAddToAlbumsModal(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseAddToAlbumsModal = () => {
    setShowAddToAlbumsModal(false);
  };

  const handleCheckboxChange = (event) => {
    const albumId = event.target.value;
    if (event.target.checked) {
      setSelectedAlbums((prevSelectedAlbums) => [...prevSelectedAlbums, albumId]);
    } else {
      setSelectedAlbums((prevSelectedAlbums) =>
        prevSelectedAlbums.filter((id) => id !== albumId)
      );
    }
  };


  const handleAddToSelectedAlbums = async () => {
    try {
      // Get the _id of the selected image
      console.log(selectedImage);
      const imageId = selectedImage._id;
  
      await axios.post(`http://localhost:5000/api/addToAlbums/${imageId}`, {
        albums: selectedAlbums,
      }, {
        headers: {
          authorization: `${authToken}`,
        },
      });
  
      alert('Image added to selected albums successfully!');
      handleCloseAddToAlbumsModal();
    } catch (error) {
      console.error('Error adding image to albums:', error);
    }
  };
  

  const filterImages = () => {
    // Filter images based on the search queries
    let filteredImages = images;
    if (searchQuery) {
      filteredImages = filteredImages.filter((image) =>
        image.senderName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (imgSearchQuery) {
      filteredImages = filteredImages.filter((image) =>
        image.img.toLowerCase().includes(imgSearchQuery.toLowerCase())
      );
    }
    return filteredImages;
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center bg-info ">
        {/* Search Bar for Sender Name */}
        <Form.Group className="mb-3 w-50 mt-4">
          <Form.Control
            type="text"
            placeholder="Search by sender name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>

        {/* Search Bar for Image Name */}
        <Form.Group className="mb-4 w-50">
          <Form.Control
            type="text"
            placeholder="Search by image name"
            value={imgSearchQuery}
            onChange={(e) => setImgSearchQuery(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>
      </div>

      <div className="bg-info">
        {/* Images */}
        <div>
          <Row className="justify-content-center">
            {filterImages().map((image) => (
              <Col key={image._id} md={4} className="mb-4 p-4">
                <Card className="h-100">
                  <Card.Body className="bg-secondary text-light justify-content-center">
                    <Card.Title className="">Uploaded by: {image.senderName}</Card.Title>
                    <Card.Img
                      src={`http://localhost:5000/api/upload/${image.img}`}
                      alt={image.senderName}
                      className="img-thumbnail"
                      onClick={() => handleImageClick(image)}
                    />
                    <Card.Text>
                      {/* <div className="d-flex justify-content-between mt-2">
                        <div className="d-flex align-items-center">
                          <AiOutlineHeart className="like-icon" />
                          <span className="ml-2">{image.likes}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <AiOutlineMessage className="comment-icon" />
                          <span className="ml-2">{image.comments.length}</span>
                        </div>
                      </div> */}
                      <div>
                        <h5>
                          {image.img}
                        </h5>
                      </div>
                    </Card.Text>
                    
                    {/* <Button
                    className="m-2"
                      variant="primary"
                      onClick={() => handleDownload(image.img)}
                    >
                      Download
                    </Button>
               
                 
                    <Button
                      variant="primary"
                      onClick={() => handleAddToAlbums(image)}
                      className="ml-2"
                    >
                      Add to Albums
                    </Button> */}

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton className = "bg-primary text-light">
          <Modal.Title>Uploaded by: {selectedImage?.senderName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000/api/upload/${selectedImage?.img}`}
            alt={selectedImage?.senderName}
            className="img-fluid"
          />
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <AiOutlineHeart className="like-icon-modal" />
              <span className="ml-2">{selectedImage?.likes}</span>
            </div>
            <ul>
              {/* {selectedImage?.comments.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.commenterName}:</strong> {comment.comment}
                </li>
              ))} */}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
         <Button
                    className="m-2"
                      variant="primary text-light w-25"
                      onClick={() => handleDownload(selectedImage.img)}
                    >
                      Download
                    </Button>
               
                 
                    <Button
                      variant="primary text-light w-25"
                      onClick={() => handleAddToAlbums(selectedImage.img)}
                      className="ml-2"
                    >
                      Add to Albums
                    </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add to Albums Modal */}
      <Modal
        show={showAddToAlbumsModal}
        onHide={handleCloseAddToAlbumsModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Add to Albums</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {albums.map((album) => (
              <h4>
              <Form.Check
                key={album._id}
                type="checkbox"
                id={`album-${album._id}`}
                label={album.name}
                value={album._id}
                checked={selectedAlbums.includes(album._id)}
                onChange={handleCheckboxChange}
              />
              </h4>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" className='w-25' onClick={handleAddToSelectedAlbums}>
            Add
          </Button>
          <Button variant="danger" onClick={handleCloseAddToAlbumsModal}>
            Cancel
          </Button>
     
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowImages;


