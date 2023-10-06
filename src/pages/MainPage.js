import './Mainpage.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faShuffle} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export function MainPage(props) {

    const audio = useContext(AudioContext);

    const songs = props.songs;


    return (
        <div className="mainpage-container">

            <div className="mainpage-header">

                <div className="mainpage-recommend">
                    <h2>Legújabb számok</h2>

                    <div className="song-card-container">

                        { songs && songs.slice(0,3).map((song) => {
                            return (
                                <div className="song-card" key={song.id}>
                                    <div className="song-card-link" onClick={() => props.changeSong(song.id)}>
                                        <FontAwesomeIcon className={"song-card-icon"} icon={faPlay} />
                                        <div className="song-card-img-container">
                                            <img className="song-card-img" src={song.cover_url} alt="" />
                                        </div>
                                    </div>
                                    <h4>{song.title}</h4>
                                    <p>{song.album_title}</p>
                                </div>
                            )
                        }) }

                    </div>
                </div>

                
                <div className='second-mainpage-container'>
                    <div className="second-mainpage-content">
                        <h2>Random</h2>
                        <div className="mainpage-player" onClick={() => props.randomPlaySong()}>
                            <FontAwesomeIcon className={"mainpage-random-btn"} icon={faShuffle} />
                        </div>
                        <h4>Véletlenszerű lejátszás</h4>
                    </div>
                    <div className="second-mainpage-content">
                        <h2>Album</h2>
                        
                        <div className="album-card">
                            <Link to={'/album/tulzo-lang'}><div className="album-card-link">
                                <div className="album-card-icon-border" onClick={() => {
                                    props.selectAlbum("Túlzó láng");
                                    props.openPlayerComponent();
                                    if(!props.isPlaying) {
                                        props.PlayPause();
                                    }
                                    window.scrollTo(0, 0);
                                }}>
                                    <FontAwesomeIcon className={"album-card-icon"} icon={faPlay} />
                                </div>
                                <div className="album-card-img-container">
                                    <img className="album-card-img" src={"../albumBorito.webp"} alt="" />
                                </div>
                            </div>
                            </Link>
                            
                        </div>
                        <h4>Túlzó láng</h4>
                        <p>Album</p>
                    </div>
                    <div className="second-mainpage-content">
                        
                    </div>

                </div>


            </div>

        </div>
    );
}