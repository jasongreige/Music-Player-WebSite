import React, {useState, useContext, useEffect} from "react";
import reducer, { ACTIONS } from "../reducers/reducer";

import PlaylistContext from "../contexts/PlaylistContext";

export default function Song({ song, index }) {
  const { state, dispatch } = useContext(PlaylistContext);
  const api = useContext(PlaylistContext).api
  const [liked, setLiked] = useState(song.liked);

  console.log(song)

  useContext(PlaylistContext).api;
  const toggleLike = async () => {
      await api.updateSong(song.id)
      setLiked(!liked);
  };

  const playSong = () => {
      if (index !== undefined) {
          dispatch({ type: ACTIONS.PLAY, payload: { index: index-1 } });
      }
  };
  return (
    <section
      className="song-item flex-row"
      onClick={() => {
              playSong();
      }}
    >
      {index !== undefined ? <span>{index}</span> : <></>}
        <span>{song.name}</span>
        <span>{song.artist}</span>
        <span>{song.album}</span>
        <span>{song.genre}</span>

      <button
        className={`${liked ? "fa" : "fa-regular"} fa-2x fa-heart`}
        onClick={toggleLike}
      ></button>
    </section>
  );
}
