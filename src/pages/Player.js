import './Player.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackwardStep, faForwardStep, faPause, faPlay, faRepeat, faShuffle} from "@fortawesome/free-solid-svg-icons";
import {NextSong} from "../components/NextSong";
import {NewReleaseSong} from "../components/NewReleaseSong";
import {useRef} from "react";

export function Player({playList, songs, audioElem, isPlaying, setIsPlaying, currentSong, setCurrentSong ,release}) {

    const clickRef = useRef();

    let songNumber = -1;

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

        if (index === 0) {
            setCurrentSong(playList[playList.length -1]);
        } else {
            setCurrentSong(playList[index - 1]);
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
                    <span className={"time-current"}>0:07</span>
                    <div className={"time-line-container"} onClick={checkWidth}  ref={clickRef} >
                        <div className="time-line" style={{width: `${currentSong.progress+"%"}`}}></div>
                    </div>
                    <span className={"time-over"}>{ isPlaying ? minutes + ":" + seconds : "0:00"}</span>
                  </div>
                  <div className="audio-controls">
                      <FontAwesomeIcon className={"play-audio small-control"} icon={faShuffle} />
                      <FontAwesomeIcon className={"play-audio medium-control"} icon={faBackwardStep} onClick={() => skipBack()} />
                      {isPlaying ?
                          <FontAwesomeIcon className={"play-audio"} icon={faPause} onClick={() => PlayPause()} />
                          :
                          <FontAwesomeIcon className={"play-audio"} icon={faPlay} onClick={() => PlayPause()} />
                      }
                      <FontAwesomeIcon className={"play-audio medium-control"} icon={faForwardStep} onClick={() => skipForward()} />
                      <FontAwesomeIcon className={"play-audio small-control"} icon={faRepeat} />
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
            <div className="album-container">
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
                            <NewReleaseSong currentSong={song} key={song.title} />
                            )}
                        )
                    }
                </div>
            </div>


          </div>

      </div>
  );
}