import './Player.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

export function Player({audioElem, isPlaying, setIsPlaying, currentSong}) {

    const PlayPause = () => {
        setIsPlaying(!isPlaying);
    }

  return (
      <div className="player-container" >

          <div className="player">
                <div className="casette-div" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/cassette.png'})`}}>
                    <p className="casette-tittle">{currentSong.title}</p>
                </div>
              <div className="audio-detail">
                  <h2 className={"audio-detail-title"}>{currentSong.title}</h2>
                  <div className="audio-controls">
                      {isPlaying ?
                          <FontAwesomeIcon className={"play-audio"} icon={faPause} onClick={() => PlayPause()} />
                          :
                          <FontAwesomeIcon className={"play-audio"} icon={faPlay} onClick={() => PlayPause()} />
                      }
                  </div>
              </div>

          </div>

          <div className="album-name-and-releases">

          </div>

      </div>
  );
}