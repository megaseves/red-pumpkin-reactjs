import './Player.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackwardStep,
    faEllipsisVertical,
    faForwardStep,
    faPause,
    faPlay,
    faRepeat,
    faShuffle,
    faVolumeLow
} from "@fortawesome/free-solid-svg-icons";
import {NextSong} from "../components/NextSong";
import {NewReleaseSong} from "../components/NewReleaseSong";
import {useRef} from "react";

export function Player({playList, songs, audioElem, isPlaying, setIsPlaying, currentSong, setCurrentSong ,release, selectAlbum, setIsRepeat, isRepeat, shufflePlayList}) {

    const clickRef = useRef();
    const MAX = 20;

    let songNumber = -1;

    // const [currentTime, setCurrentTime] = useState(0);

    const PlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    //console.log(playList)

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divProgress = offset / width * 100;
        if (audioElem.current.currentTime !== 0) {
            audioElem.current.currentTime = divProgress / 100 * currentSong.length;
        }
    }

    const skipBack = () => {
        setIsPlaying(true);
        const index = playList.findIndex(x=>x.title === currentSong.title);

        if (currentSong.seconds > 4) {
            audioElem.current.currentTime = 0;
        } else {
            if (index === 0) {
                setCurrentSong(playList[playList.length -1]);
            } else {
                setCurrentSong(playList[index - 1]);
            }
        }
    }
    const skipForward = () => {
        setIsPlaying(true);
        const index = playList.findIndex(x=>x.title === currentSong.title);

        if (index === playList.length -1) {
            setCurrentSong(playList[0]);
        } else {
            setCurrentSong(playList[index + 1]);
        }
    }

    const converter = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let extraSeconds = seconds % 60;
        //minutes = minutes < 10 ? "0" + minutes : minutes;
        extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

        return minutes + ':' + extraSeconds;
    };
    const volume = currentSong.volume !== undefined && currentSong.volume * 100;
    //console.log(volume);

    const toggleRepeatBtn = () => {
        const repeatBtn = document.querySelector('#repeat');

        if (repeatBtn.classList.contains('active-btn')) {
            repeatBtn.classList.remove('active-btn');
            setIsRepeat(false);
        } else {
            repeatBtn.classList.add('active-btn');
            setIsRepeat(true);
        }
    };

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

    const minutes = audioElem.current !== undefined && Math.floor(audioElem.current.duration / 60);
    const secondData = audioElem.current !== undefined && Math.floor((audioElem.current.duration - minutes * 60));
    const seconds = secondData < 10 ? "0" + secondData : secondData;

  return (

      <div className="player-container" >

          <div className="player">
                <div className="casette-div" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/cassette.png'})`}}>
                    <p className="casette-tittle">{currentSong.title}</p>
                </div>
              <div className="audio-detail">
                  <h2 className={"audio-detail-title"}>{currentSong.title}</h2>
                  <h4 className={"audio-detail-album-name"}>Red Pumpkin</h4>
                  <div className="audio-detail-time">
                    <span className={"time-current"}>{ currentSong.seconds ? converter(Math.floor(currentSong.seconds)) : "0:00"}</span>
                    <div className={"time-line-container"} onClick={checkWidth}  ref={clickRef} >
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
                            {/*<div className="volume-control" style={{height: `${volume+"%"}`}}></div>*/}
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
                      <FontAwesomeIcon id={'repeat'} className={"play-audio small-control"} icon={faRepeat} onClick={() => toggleRepeatBtn()} />
                      <FontAwesomeIcon className={"play-audio small-control"} icon={faEllipsisVertical} />
                  </div>
              </div>
              <div className="up-next-container">
                  <div className="container-line"></div>
                  <h3 className={"container-title"} >Up Next</h3>
                  <div className="up-next-songs">

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

          <div className="album-name-and-releases">
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


          </div>

      </div>
  );
}