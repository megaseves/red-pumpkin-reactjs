import './Player.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPause,
    faPlay,
    faChevronDown,
    faCirclePlay,
    faCirclePause,
    faBackwardStep,
    faForwardStep
} from "@fortawesome/free-solid-svg-icons";
import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableItem } from '../../components/SortableItem';
import {useContext} from "react";
import {AudioContext} from "../../components/AudioContext";

export function Player({ clickRef, closePlayerComponent, PlayPause, skipBack, skipForward, toggleRepeat, playList, setPlayList , songs, audioElem, isPlaying, checkWidth, setIsPlaying, currentSong, setCurrentSong ,release, selectAlbum, setIsRepeat, isRepeat, shufflePlayList, seconds, minutes, converter, hoverPauseAudioOnMainpage, leaveHoverPauseAudioOnMainpage, ChangeSong}) {

    const audio = useContext(AudioContext);

    let i = 0;

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

    const handleDragEnd = (event) => {
         const {active, over} = event;

         if(active.id !== over.id) {
            const activeIndex = playList.indexOf(playList[active.id]);
            const overIndex = playList.indexOf(playList[over.id]);

            let newPlayList = arrayMove(playList, activeIndex, overIndex);
            setPlayList(newPlayList);
         }
    };


  return (

      <div className="player-container" >
        <div className='mobile-player-header'>
          <FontAwesomeIcon icon={faChevronDown} className='down-icon' onClick={() => closePlayerComponent("player")} />
        </div>
        <div className="player-background"></div>

                <div className='player-avatar'>
                  <div className="player" onClick={() => PlayPause()}>
                      <div className="player-playbtn-container">{isPlaying ?
                              <FontAwesomeIcon className={"player-playbtn"} icon={faPause} onClick={() => PlayPause()} />
                              :
                              <FontAwesomeIcon className={"player-playbtn"} icon={faPlay} onClick={() => PlayPause()} />
                          }</div>
                      <div className="player-title-container"><div className='player-title'><h1>{currentSong.title}</h1></div><div className='player-title'><h3>{currentSong.album_title} album</h3></div></div>
                      <div className="player-borito-background" style={{backgroundImage: `url(${currentSong.background_cover_url})`}}></div>

                  </div>
                </div>

                <div className='mobile-player-title'>
                  <h3 className='mobile-player-title-h3'>{audio.title}</h3>
                  <p className='mobile-player-title-p'>{audio.album_title}</p>
                </div>

                <div className={"time-line-container-mobile"} onClick={checkWidth} ref={clickRef} >
                  <div className="time-line-mobile" style={{width: `${currentSong.progress+"%"}`}}></div>
                  <div className="time-line-bg-mobile"></div>
                </div>

                <div className="time-container-bottom-player-mobile">
                        <span className={"time-current-mobile"}>{ currentSong.seconds ? converter(Math.floor(currentSong.seconds)) : "0:00"}</span>
                        
                        <span className={"time-over-mobile"}>{ minutes ? minutes + ":" + seconds : "0:00"}</span>
                </div>
                

                <div className='mobile-player-btns'>
                    <FontAwesomeIcon className={"play-audio medium-control-mobile"} icon={faBackwardStep} onClick={() => skipBack()} />
                    {isPlaying ?
                        <FontAwesomeIcon  className={"player-playbtn-mobile"} icon={faCirclePause} onClick={() => PlayPause()} />
                        :
                        <FontAwesomeIcon className={"player-playbtn-mobile"} icon={faCirclePlay} onClick={() => PlayPause()} />
                    }
                    <FontAwesomeIcon className={"play-audio medium-control-mobile"} icon={faForwardStep} onClick={() => skipForward()} />
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


                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >            
                    <div className="up-next-songs">

                        <SortableContext items={playList} strategy={verticalListSortingStrategy}>
                            
                            { playList && playList.map(song =>
                                    <SortableItem key={song.id} song_id={song.id} id={i++} title={song.title} album_title={song.album_title} length={song.length} currentSong={currentSong} cover_url={song.cover_url} isPlaying={isPlaying} hoverPauseAudioOnMainpage={hoverPauseAudioOnMainpage} leaveHoverPauseAudioOnMainpage={leaveHoverPauseAudioOnMainpage} PlayPause={PlayPause} ChangeSong={ChangeSong} />
                             )}

                        </SortableContext>

                    </div>
                </DndContext>


              </div>
          </div>

      </div>
  );
}