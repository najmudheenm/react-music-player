import React from "react";

function LibrarySong({
  song,
  setCurrentSong,
  audioRef,
  play,
  songs,
  setSongs,
}) {
  const songSelectingHandler = async () => {
    await setCurrentSong(song);
    const newSong = songs.map((listSong) => {
      if (listSong.id === song.id) {
        return {
          ...listSong,
          active: true,
        };
      } else {
        return { ...listSong, active: false };
      }
    });
    setSongs(newSong);
    if (play) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelectingHandler}
      className={`library-songs ${song.active ? "active" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>

      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
