import { useState } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPause,
    faPlay,
    faBarsStaggered
} from "@fortawesome/free-solid-svg-icons";
import './SortableItem.css';


export function SortableItem(props) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const mouseEnterForPlayIcon = () => {
        const pauseBtn = document.getElementById("play"+props.song_id);
        const staggeredBtn = document.getElementById("stagger" + props.song_id);

        pauseBtn && pauseBtn.classList.remove("close");
        staggeredBtn && staggeredBtn.classList.add("close");
    };

    const mouseLeaveForPlayIcon = () => {
        const pauseBtn = document.getElementById("play"+props.song_id);
        const staggeredBtn = document.getElementById("stagger" + props.song_id);

        pauseBtn && pauseBtn.classList.add("close");
        staggeredBtn && staggeredBtn.classList.remove("close");
    };


    const clickChangeSong = (event) => {
        console.log('Element clicked!');
        /* props.changeSong(props.song_id); */
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onMouseEnter={mouseEnterForPlayIcon} onMouseLeave={mouseLeaveForPlayIcon} >
            <div className={ props.song_id !== props.currentSong.id ? "song-card-drag up-next-song" : "song-card-drag up-next-song selected" } >
               
                <div className="up-next-url-container">
                    
                {   props.isPlaying && props.song_id === props.currentSong.id ?
                        <div className='on-playing-container'  >
                            <FontAwesomeIcon className={"on-not-playing-icon-pause close"} icon={faPause} />
                            <div class="on-playlist-playing" >
                                <span class="playing__bar playing__bar1"></span>
                                <span class="playing__bar playing__bar2"></span>
                                <span class="playing__bar playing__bar3"></span>
                                <span class="playing__bar playing__bar4"></span>
                                <span class="playing__bar playing__bar5"></span>
                                <span class="playing__bar playing__bar2"></span>
                                <span class="playing__bar playing__bar6"></span>
                                <span class="playing__bar playing__bar7"></span>
                            </div>
                        </div>
                    :
                        <div className='on-not-playing-container' data-no-dnd="true" >
                            <FontAwesomeIcon id={"play" + props.song_id} className={"play-audio on-not-playing-icon on-not-playing-play close"} icon={faPlay} />
                            <FontAwesomeIcon className={"play-audio on-not-playing-icon on-not-playing-pause close"} icon={faPause} />
                            <FontAwesomeIcon id={"stagger" + props.song_id} className={"play-audio on-not-playing-icon on-not-playing-staggered"} icon={faBarsStaggered} />
                        </div>
                    }
                </div>


                <div className="up-next-song-detail">
                    <span className="up-next-song-title">{props.title}</span>
                    <span className="up-next-song-album">{props.album_title} album</span>
                </div>
                <div className="up-next-song-min-con">
                    <span className="up-next-song-min">{props.length}</span>
                </div>        
            </div>
        </div>
    )
}