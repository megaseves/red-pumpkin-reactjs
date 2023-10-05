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

                    {/*<div className="casette-div" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/cassette.png'})`}}>
                        <p className="casette-tittle">{currentSong.title}</p>
                    </div>
                    <div className="audio-detail">
                    <h2 className={"audio-detail-title"}>{currentSong.title}</h2>
                    <h4 className={"audio-detail-album-name"}>Red Pumpkin</h4>
                    <div className="audio-detail-time">
                        <span className={"time-current"}>{ currentSong.seconds ? converter(Math.floor(currentSong.seconds)) : "0:00"}</span>
                        <div className={"time-line-container"} onClick={checkWidthPlayer}  ref={clickPlayerRef} >
                            <div className="time-line" style={{width: `${currentSong.progress+"%"}`}}></div>
                        </div>
                        <span className={"time-over"}>{ minutes ? minutes + ":" + seconds : "0:00"}</span>
                    </div>
                    <div className="audio-controls">
                        <FontAwesomeIcon id={'volume'} className={"play-audio small-control"} icon={faVolumeLow} onClick={() => volumeModal()} />
                        <div className={'volume-control-container'}>
                            <div className={'volume-control-body'}>
                                <div className="volume-control-box">
                                    <input className="volume-control" type="range" min={0} max={MAX} onChange={handleVolume}/>
                                </div>
                            </div>
                        </div>
                        <FontAwesomeIcon className={"play-audio small-control"} icon={faShuffle} onClick={() => shufflePlayList()} />
                        <FontAwesomeIcon className={"play-audio medium-control"} icon={faBackwardStep} onClick={() => skipBack()} />
                        {isPlaying ?
                            <FontAwesomeIcon className={"play-audio"} icon={faPause} onClick={() => PlayPause()} />
                            :
                            <FontAwesomeIcon className={"play-audio"} icon={faPlay} onClick={() => PlayPause()} />
                        }
                        <FontAwesomeIcon className={"play-audio medium-control"} icon={faForwardStep} onClick={() => skipForward()} />
                        <FontAwesomeIcon id={'toggleBtn'} className={"play-audio small-control"} data-active={'non-active'} icon={faRepeat} onClick={() => toggleRepeat()} />
                        <FontAwesomeIcon className={"play-audio small-control"} icon={faEllipsisVertical} />
                    </div>
                        </div> */}

                </div>

          <div className="playlist-and-lyrics">
              <div className="up-next-container">
                  <h3 className={"container-title"} >KÖVETKEZIK</h3>
                  <div className="container-line"></div>
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