import React from "react";

function Song(props) {
    //console.log(props);
    const {name,cover,artist}=props.currentSong;
  return (
    <section className="song-container">
      <img src={cover} alt={name}/>
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </section>
  );
}

export default Song;
