import { useState, useRef } from "react";
import "./styles/app.scss";
// importing components
import Player from "./components/Player";
import Songs from "./components/Songs";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [play, setplay] = useState(false);
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const timeUpadater = (e) => {
    const animation = Math.round(
      (e.target.currentTime / e.target.duration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    const index = songs.findIndex((son) => son.id === currentSong.id);
    await setCurrentSong(songs[(index + 1) % songs.length]);
    if (play) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Songs currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        play={play}
        setPlay={setplay}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        play={play}
        currentSong={currentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />

      <audio
        ref={audioRef}
        onTimeUpdate={timeUpadater}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
