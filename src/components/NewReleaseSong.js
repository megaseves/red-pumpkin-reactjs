

export function NewReleaseSong({currentSong}) {
    return(
        <div className="new-release-song">
            <img className="release-song-image" src={currentSong.album_url} alt=""></img>
            <div className="release-song-detail">
                <span className="release-song-title">Bukott angyal</span>
                <span className="release-song-album">Túlzó láng album</span>
            </div>
        </div>
    );
}