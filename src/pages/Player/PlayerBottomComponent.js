import './PlayerBottomComponent.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackwardStep, faCaretUp,
    faEllipsisVertical,
    faForwardStep,
    faPause,
    faPlay, faRepeat, faShuffle,
    faVolumeLow,
    faVolumeXmark
} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {AudioContext} from "../../components/AudioContext";

export function PlayerBottomComponent({clickRefBottom, checkWidthBottom, isPlaying, PlayPause, skipBack, skipForward, toggleRepeat, setIsRepeat , shufflePlayList, audioElem, seconds, minutes, currentSong, converter, checkWidth, clickRef, showPlayerComponent, bottomPlayerRef, openPlayerComponent, isActiveVolumeModal, setIsActiveVolumeModal, volumeMute, setCurrentVolume, currentVolume}) {

    const audio = useContext(AudioContext);

    const MAX = 20;


    const handleVolume = (e) => {
        const { value } = e.target;
        audioElem.current.volume = value / MAX;
        setCurrentVolume(value / MAX);
    };

    const volumeModalOpen = () => {
        const volumeBtn = document.querySelector('#volume');
        const volumeControlContainer = document.querySelector('.bottom-player-volume-control-container');

        volumeBtn.classList.add('active-btn');
        volumeControlContainer.classList.add('open');

        setIsActiveVolumeModal(false);
    };

    const volumeModalClose = () => {
        const volumeBtn = document.querySelector('#volume');
        const volumeControlContainer = document.querySelector('.bottom-player-volume-control-container');

        volumeBtn.classList.remove('active-btn');
        volumeControlContainer.classList.remove('open');

        setIsActiveVolumeModal(false);
    };

    return(

        <div className="player-bottom-component-container" onMouseLeave={() => volumeModalClose() }>

            <div className="back-to-player" onClick={() => openPlayerComponent()}>
                <FontAwesomeIcon className={"back-to-player-icon"} icon={faCaretUp} />
                <img className="back-to-player-img" src={currentSong.cover_url} alt="" />
            </div>

            <div className={"time-line-container-bottom"} onClick={checkWidthBottom}  ref={clickRefBottom} >
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

                <div className="title-container" onClick={(e) => showPlayerComponent(e)}>
                    <img className="release-song-image" src={currentSong.cover_url} alt=""></img>
                    <div className="song-title-and-album">
                        <div className="song-title"><h3>{audio.title}</h3></div>
                        <div className="album-title"><p>{audio.album_title}</p></div>
                    </div>
                    <div className="settings">
                        <FontAwesomeIcon className={"play-audio small-control"} icon={faEllipsisVertical} />
                    </div>
                </div>

                <div className="other-controls" onClick={(e) => showPlayerComponent(e) }>
                    <div ref={bottomPlayerRef} className={"ForRef"}>
                        <div className={'bottom-player-volume-control-container'}>
                            <div className={'bottom-player-volume-control-body'}>
                                <div className="bottom-player-volume-control-box">
                                    <input id="bottom-player-volume-control" type="range" min={0} max={MAX} onChange={handleVolume}/>
                                </div>
                            </div>
                        </div>

                        { audioElem.current != undefined && audioElem.current.volume === 0 ? 
                            <FontAwesomeIcon id={'volume'} className={"play-audio small-control"} icon={faVolumeXmark} onMouseOver={() => volumeModalOpen() } onClick={() => volumeMute() } />
                        :
                            <FontAwesomeIcon id={'volume'} className={"play-audio small-control"} icon={faVolumeLow} onMouseOver={() => volumeModalOpen() } onClick={() => volumeMute() } />
                    }
                        

                        <FontAwesomeIcon id={'toggleBtn'} className={"play-audio small-control"} icon={faRepeat} data-active={'non-active'} onClick={() => toggleRepeat()} />
                        <FontAwesomeIcon className={"play-audio small-control"} icon={faShuffle} onClick={() => shufflePlayList()} />

                    </div>

                </div>
            </div>

        </div>
    );
}