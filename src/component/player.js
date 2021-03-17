import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
function Player({
  songInfo,
  setIsPlaySong,
  setSongInfo,
  audioRef,
  isPlaySong,
  currentSong,
  activeLibraryHandler,
  setCurrentSong,
  listSong,
  setListSong
}) {
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const handlePlayButton = () => {
    if (isPlaySong) {
      audioRef.current.pause();
      setIsPlaySong(!isPlaySong);
    } else {
      audioRef.current.play();
      setIsPlaySong(!isPlaySong);
    }
  };
  const handlePreviosButton = async(direction)=>{
    const index = listSong.findIndex((item)=>item.id===currentSong.id);
    //const temp = activeLibraryHandler(index);
    if(direction==="previos"){
      let target = (index-1)%listSong.length
      if(target===-1){
        target = listSong.length-1;
      }
      const temp = activeLibraryHandler(target);
      setListSong(temp);
      await setCurrentSong(temp[target]);
    }
    if(direction==="next"){
      const target = (index+1)%listSong.length;
      const temp = activeLibraryHandler(target);
      setListSong(temp);
      await setCurrentSong(temp[target]);
    }
   
    if (isPlaySong) {
      audioRef.current.play();
      //console.log(audioRef.current.play())
    }
  }
  const handleOnChangeTrack = (e) => {
    const target = e.target.value;
    audioRef.current.currentTime = target;
    setSongInfo({ ...songInfo, currentTime: target });
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            value={songInfo.currentTime}
            max={songInfo.duration || 0}
            min={0}
            onChange={handleOnChangeTrack}
          />
          <div
            className="anime-track"
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
          />
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon icon={faAngleLeft} size="2x" onClick={()=>{
          handlePreviosButton("previos")
        }}/>
        <FontAwesomeIcon
          icon={isPlaySong ? faPause : faPlay}
          size="2x"
          onClick={handlePlayButton}
        />
        <FontAwesomeIcon icon={faAngleRight} size="2x" onClick={()=>{
           handlePreviosButton("next")
        }}/>
      </div>
    </div>
  );
}

export default Player;
