import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Screens/Login';
import { Route } from 'react-router-dom';
import SignUp from './Screens/SignUp';
import { Routes } from 'react-router-dom';
import Gallery from './Screens/Gallery';
import ImgUpload from './Components/ImgUpload';
import CreateAlbum from './Components/CreateAlbum';
import MyAlbums from './Components/MyAlbums';
import ViewAlbum from './Components/ViewAlbum';

function App() {
  return (
    
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/gallery" element={<Gallery />} />

        <Route path="/upload"  element={<ImgUpload/>} />
        <Route path="/createAlbum"  element={<CreateAlbum/>} />
        <Route path="/myAlbums" element={<MyAlbums/>} />
        <Route path="/viewAlbum/:albumId"  element={<ViewAlbum/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;