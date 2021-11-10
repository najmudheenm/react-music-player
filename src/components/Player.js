import React from "react";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = ({
  currentSong,
  play,
  setPlay,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const libraryUdateHandler = (nextPre) => {
    const newSong = songs.map((listSong) => {
      if (listSong.id === nextPre.id) {
        return {
          ...listSong,
          active: true,
        };
      } else {
        return { ...listSong, active: false };
      }
    });
    setSongs(newSong);
  };
  const playSongHandler = () => {
    if (play) {
      audioRef.current.pause();
      setPlay(!play);
    } else {
      audioRef.current.play();
      setPlay(!play);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipHandler = async (direcion) => {
    const index = songs.findIndex((son) => son.id === currentSong.id);

    if (direcion === "back") {
      if (index === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        libraryUdateHandler(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[index - 1]);
        libraryUdateHandler(songs[index - 1]);
      }
    } else {
      await setCurrentSong(songs[(index + 1) % songs.length]);
      libraryUdateHandler(songs[(index + 1) % songs.length]);
    }
    if (play) audioRef.current.play();
  };

  //add style for track animate
  const trackAnimate = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={songInfo.duration ? songInfo.duration : "0.00"}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnimate} className="animated-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipHandler("back")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={play ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipHandler("forward")}
        />
      </div>
    </div>
  );
};
export default Player;
