import React from "react";

function Library({ activeLibrary, listSong,changeCurrentSong }) {
    console.log(activeLibrary)
  return (
    <aside className={activeLibrary ? "library acitive-library" : "library"}>
      <h2>Library of Songs</h2>
      <div className="library-songs">
        {listSong.map((item) => {
            const {cover,id,active,artist,name}=item;
          return (
            <article className={active ?"library-song selected":"library-song"} key={id} onClick={()=>{
                changeCurrentSong(id)
            }}>
              <img src={cover} />
              <div className="song-description">
                <h3>{name}</h3>
                <h4>{artist}</h4>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
export default Library;
