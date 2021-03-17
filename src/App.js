import React, { useRef, useState } from "react";
import Nav from "./component/nav";
import Song from "./component/song";
import Library from "./component/library";
import Player from "./component/player";
import data from "./data";
function App() {
  const audioRef = useRef(null);
  const [listSong, setListSong] = useState(data);
  const [currentSong, setCurrentSong] = useState(listSong[0]);
  const [activeLibrary, setActiveLibrary] = useState(false);
  const [isPlaySong, setIsPlaySong] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0, 
  });
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrentTime = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercent = Math.round(
      (roundedCurrentTime / roundedDuration) * 100
    );
    console.log(currentTime, duration, animationPercent);
    setSongInfo({
      currentTime,
      duration,
      animationPercentage: animationPercent,
    });
  };
  const songEndHandler =async (e)=>{
    const index = listSong.findIndex((item) => item.id === currentSong.id);
    const nextIndex = (index+1)%listSong.length;
    //console.log()
    const temp = activeLibraryHandler(nextIndex);
    await setCurrentSong(listSong[nextIndex]);
    setListSong(temp);
    if (isPlaySong) {
      audioRef.current.play();
      //console.log(audioRef.current.play())
    }
  }
  //console.log(currentSong)
  const changeLibraryActive = () => {
    //console.log(active);
    setActiveLibrary((currentActive) => {
      return !currentActive;
    });
  };
  const changeCurrentSong = async (id) => {
    const index = listSong.findIndex((item) => item.id === id);
    const temp = activeLibraryHandler(index);
    setListSong(temp);
    await setCurrentSong(listSong[index]);

    if (isPlaySong) {
      audioRef.current.play();
      //console.log(audioRef.current.play())
    }
  };
  const activeLibraryHandler=(index)=>{
    const cloneListSong = listSong.map((item, currIndex) => {
      if (index === currIndex) {
        return { ...item, active: true };
      }
      return { ...item, active: false };
    });
    return cloneListSong;
  }
  return (
    <div className="App">
      <Nav changeLibraryActive={changeLibraryActive} active={activeLibrary} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        setIsPlaySong={setIsPlaySong}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaySong={isPlaySong}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        activeLibraryHandler={activeLibraryHandler}
        setListSong={setListSong}
          listSong={listSong}
      />
      <Library
        activeLibrary={activeLibrary}
        listSong={listSong}
        changeCurrentSong={changeCurrentSong}
      />
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
