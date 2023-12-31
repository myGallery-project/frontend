import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ImgUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const authToken = localStorage.getItem('token');

  const handleFileChange = (e) => {
    console.log("handleFilechange");
    const selectedFile = e.target.files[0];
    // Validate file type
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    setFile(selectedFile);
    console.log("file:", selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    console.log("handleUpload");
    if (!file) {
      return; // No file selected, handle this error as needed
    }

    if (!authToken) {
      alert('Please log in to upload files');
      return;
    }

    const formData = new FormData();
    formData.append("name", "filename");
    formData.append('file', file);

    try {
      console.log("file", file);
      console.log("Auth:", authToken);
      const response = await axios.post('http://localhost:5000/api/uploadImage', formData, {
        headers: {
          authorization: `${authToken}`,
        },
      });
      console.log("Data", response.data.originalname);
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
    }
    
    setShowModal(false);
    window.location.reload()
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button variant="primary" onClick={handleToggleModal} >
        Upload Image File
      </Button>


      <Modal show={showModal} onHide={handleToggleModal} centered>
        <div>
          <Modal.Header closeButton className="d-flex justify-content-center bg-primary">
            <Modal.Title className="text-light">Upload Your Image</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          {selectedFileName && (
            <div className="text-center">
              <h3>{selectedFileName}</h3>
            </div>
          )}
          <div className="d-flex justify-content-center mt-4">
            <label htmlFor="fileInput" className="btn btn-secondary btn-lg m-3">
              <AiOutlinePlus className="mr-2" /> Import Image
              <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />
            </label>
            <div>
              <Button variant="danger" type="button" onClick={handleUpload} id="uploadButton" className="btn-lg m-3">
                Upload
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImgUpload;
