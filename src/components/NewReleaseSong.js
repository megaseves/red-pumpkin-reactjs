

export function NewReleaseSong({currentSong, songKey}) {
    return(
        <div className="new-release-song" key={songKey}>
            <img className="release-song-image" src={currentSong.album_url} alt=""></img>
            <div className="release-song-detail">
                <span className="release-song-title">{currentSong.title}</span>
                <span className="release-song-album">{currentSong.album_title}</span>
            </div>
        </div>
    );
}