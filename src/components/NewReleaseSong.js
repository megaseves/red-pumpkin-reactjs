

export function NewReleaseSong({currentSong, setIsPlaying, setCurrentSong, playList}) {

    const changeSong = () => {
        setIsPlaying(true);
        const index = playList.findIndex(x=>x.title === currentSong.title);
        setCurrentSong(playList[index]);
    }

    return(
        <div className="new-release-song" onClick={() => changeSong()} >
            <img className="release-song-image" src={currentSong.album_url} alt=""></img>
            <div className="release-song-detail">
                <span className="release-song-title">{currentSong.title}</span>
                <span className="release-song-album">{currentSong.album_title}</span>
            </div>
        </div>
    );
}