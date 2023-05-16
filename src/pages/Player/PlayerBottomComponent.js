import './PlayerBottomComponent.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackwardStep,
    faEllipsisVertical,
    faForwardStep,
    faPause,
    faPlay, faRepeat, faShuffle,
    faVolumeLow
} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {AudioContext} from "../../components/AudioContext";

export function PlayerBottomComponent({isPlaying, PlayPause, skipBack, skipForward, toggleRepeatBtn, shufflePlayList, audioElem, seconds, minutes, currentSong, converter, checkWidth, clickRef}) {

    const audio = useContext(AudioContext);

    return(

        <div className="player-bottom-component-container" >
            <div className={"time-line-container-bottom"} onClick={checkWidth}  ref={clickRef} >
                <div className="time-line-bottom" style={{width: `${currentSong.progress+"%"}`}}></div>
                <div className="time-line-bottom-bg"></div>
            </div>

            <div className="player-bottom-content-position">
                <div className="player-bottom-left">
                    <div className="play-and-pause">
                        <FontAwesomeIcon className={"play-audio medium-control"} icon={faBackwardStep} onClick={() => skipBack()} />
                        {isPlaying ?
                            <FontAwesomeIcon className={"play-audio"} icon={faPause} onClick={() => PlayPause()} />
                            :
                            <FontAwesomeIcon className={"play-audio"} icon={faPlay} onClick={() => PlayPause()} />
                        }
                        <FontAwesomeIcon className={"play-audio medium-control"} icon={faForwardStep} onClick={() => skipForward()} />
                    </div>
                    <div className="time-container-bottom-player">
                        <span className={"time-current"}>{ currentSong.seconds ? converter(Math.floor(currentSong.seconds)) : "0:00"}</span>
                        <span>/</span>
                        <span className={"time-over"}>{ minutes ? minutes + ":" + seconds : "0:00"}</span>
                    </div>

                </div>

                <div className="title-container">
                    <img className="release-song-image" src={currentSong.album_url} alt=""></img>
                    <div className="song-title-and-album">
                        <div className="song-title"><h3>{audio.title}</h3></div>
                        <div className="album-title"><p>{audio.album_title}</p></div>
                    </div>
                    <div className="settings">
                        <FontAwesomeIcon className={"play-audio small-control"} icon={faEllipsisVertical} />
                    </div>
                </div>

                <div className="other-controls">
                    <FontAwesomeIcon id={'volume'} className={"play-audio small-control"} icon={faVolumeLow} />
                    <FontAwesomeIcon className={"play-audio small-control"} icon={faRepeat} onClick={() => toggleRepeatBtn()} />
                    <FontAwesomeIcon className={"play-audio small-control"} icon={faShuffle} onClick={() => shufflePlayList()} />
                </div>
            </div>

        </div>
    );
}