import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  play,
  currentSong,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-song">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            play={play}
            songs={songs}
            setSongs={setSongs}
            id={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
