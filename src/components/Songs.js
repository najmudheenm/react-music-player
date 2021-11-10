import React from "react";
const Songs = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name}></img>
      <h1>{currentSong.name}</h1>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};
export default Songs;
