import './Player.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPause,
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import {NextSong} from "../../components/NextSong";
import {useRef} from "react";

export function Player({PlayPause, skipBack, skipForward, toggleRepeat, playList, songs, audioElem, isPlaying, checkWidth, setIsPlaying, currentSong, setCurrentSong ,release, selectAlbum, setIsRepeat, isRepeat, shufflePlayList, seconds, minutes, converter}) {

    const clickPlayerRef = useRef();

    const checkWidthPlayer = (e) => {
        let width = clickPlayerRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divProgress = offset / width * 100;
        if (audioElem.current.currentTime !== 0) {
            audioElem.current.currentTime = divProgress / 100 * currentSong.length;
        }
    }


    const MAX = 20;

    let songNumber = -1;


    const volumeModal = () => {
      const volumeBtn = document.querySelector('#volume');
      const volumeControlContainer = document.querySelector('.volume-control-container');

        if (volumeBtn.classList.contains('active-btn')) {
            volumeBtn.classList.remove('active-btn');
            volumeControlContainer.classList.remove('open');
        } else {
            volumeBtn.classList.add('active-btn');
            volumeControlContainer.classList.add('open');
        }
    };

    const handleVolume = (e) => {
        const { value } = e.target;
        audioElem.current.volume = value / MAX;
    };

    const index = () => playList.findIndex(x=>x.title === currentSong.title);


    const lyricsModalOpen = () => {
      const upNextSongsDiv = document.querySelector(".up-next-songs");
      const lyricsModalDiv = document.querySelector(".lyrics-modal");
      const upNextTitle = document.querySelector(".up-next-title");
      const lyricsTitle = document.querySelector(".lyrics-title");
      const containerLineUpNext = document.querySelector(".container-line-up-next");
      const containerLineLyrics = document.querySelector(".container-line-lyrics");
      
      upNextSongsDiv.classList.add('close');
      lyricsModalDiv.classList.remove('close');
      upNextTitle.classList.remove("active-tab");
      lyricsTitle.classList.add("active-tab");
      containerLineUpNext.classList.remove("active-tab-line");
      containerLineLyrics.classList.add("active-tab-line");
    };

    const lyricsModalClose = () => {
      const upNextSongsDiv = document.querySelector(".up-next-songs");
      const lyricsModalDiv = document.querySelector(".lyrics-modal");
      const upNextTitle = document.querySelector(".up-next-title");
      const lyricsTitle = document.querySelector(".lyrics-title");
      const containerLineLyrics = document.querySelector(".container-line-lyrics");
      const containerLineUpNext = document.querySelector(".container-line-up-next");
      
      upNextSongsDiv.classList.remove('close');
      lyricsModalDiv.classList.add('close');
      upNextTitle.classList.add("active-tab");
      lyricsTitle.classList.remove("active-tab");
      containerLineLyrics.classList.remove("active-tab-line");
      containerLineUpNext.classList.add("active-tab-line");
    };


  return (

      <div className="player-container" >
        <div className="player-background"></div>
    
                <div className="player" onClick={() => PlayPause()}>
                    <div className="player-playbtn-container">{isPlaying ?
                            <FontAwesomeIcon className={"player-playbtn"} icon={faPause} onClick={() => PlayPause()} />
                            :
                            <FontAwesomeIcon className={"player-playbtn"} icon={faPlay} onClick={() => PlayPause()} />
                        }</div>
                    <div className="player-title-container"><div className='player-title'><h1>{currentSong.title}</h1></div><div className='player-title'><h3>{currentSong.album_title} album</h3></div></div>
                    <div className="player-borito-background" style={{backgroundImage: `url(${currentSong.background_cover_url})`}}></div>

                </div>

          <div className="playlist-and-lyrics">
              <div className="up-next-container">
                <div className='up-next-tabs'>
                    <div className='up-next-div'>
                        <h3 className="container-title up-next-title active-tab" onClick={() => lyricsModalClose() }>KÖVETKEZIK</h3>
                        <div className="container-line-up-next active-tab-line"></div>
                    </div>
                    <div className='lyrics-div'>
                    <h3 className="container-title lyrics-title" onClick={() => lyricsModalOpen() }>DALSZÖVEG</h3>
                    <div className="container-line-lyrics"></div>
                    </div>
                </div>
                  <div className='lyrics-modal close'>
                    { currentSong.lyrics }
                  
                  </div>
                  <div className="up-next-songs">
                    <div className="up-next-song selected">
                        <div className="up-next-song-detail">
                            <span className="up-next-song-title">{currentSong.title}</span>
                            <span className="up-next-song-album">{currentSong.album_title} album</span>
                        </div>
                        <div className="up-next-song-min-con">
                            <span className="up-next-song-min"></span>
                        </div>
                    </div>

                      {playList.length > 0 ? playList.slice(index()+1).map((song) => {
                              songNumber++;
                              return (
                                  <NextSong song={song} key={songNumber} playList={playList} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} />
                              )
                          })
                          :
                          <p>There is no next song!</p>
                      }

                  </div>
              </div>
          </div>

          {/*<div className="album-name-and-releases">
            <div className="album-container" onClick={() => selectAlbum("Túlzó láng")}>
                <img className={"album-image"} src={currentSong.album_url} alt="" />
                <div className="album-description">
                    <h3>{currentSong.album_title} album</h3>
                    <p>Listen to all songs from this album</p>
                </div>
            </div>


            <div className="new-releases">
              <h3 className={"container-title"} >New Releases</h3>
                <div className="new-release-songs">
                    {release && release.map((song) => {
                        return (
                            <NewReleaseSong currentSong={song} key={song.title} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} playList={playList} />
                            )}
                        )
                    }
                </div>
            </div>


          </div>*/}

      </div>
  );
}