

export function NextSong({song, playList, setIsPlaying, setCurrentSong}) {

    const changeSong = () => {
        setIsPlaying(true);
        const index = playList.findIndex(x=>x.title === song.title);
        setCurrentSong(playList[index]);
    }

    return(
      <div className="up-next-song" onClick={() => changeSong()}>
          <div className="up-next-song-detail">
              <span className="up-next-song-title">{song.title}</span>
          <span className="up-next-song-album">{song.album_title} album</span>
          </div>
          <div className="up-next-song-min-con">
              <span className="up-next-song-min">{song.length}</span>
          </div>
      </div>
    );
}