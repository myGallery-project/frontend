import React from 'react';

const AlbumDetails = ({ album }) => {
  return (
    <div>
      <h2>{album.name}</h2>
      {album.images.map((image) => (
        <img
          key={image._id}
          src={image.img}
          alt={`Image ${image._id}`}
          style={{ width: '200px', height: '200px', margin: '10px' }}
        />
      ))}
    </div>
  );
};

export default AlbumDetails;
