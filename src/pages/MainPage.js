import './Mainpage.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {songsdata} from "../audios/audios";

export function MainPage(props) {

    const audio = useContext(AudioContext);

    const songs = props.songs;


    return (
        <div className="mainpage-container">

            <div className="mainpage-header">
                <div className="mainpage-player">
                    <h3>Lejátszó megnyitása</h3>
                </div>

                <div className="mainpage-recommend">
                    <h2>Legújabb számok</h2>

                    <div className="song-card-container">

                        { songs && songs.slice(0,3).map((song) => {
                            return (
                                <div className="song-card">
                                    <div className="song-card-link" onClick={() => props.changeSong(song.id)}>
                                        <FontAwesomeIcon className={"song-card-icon"} icon={faPlay} />
                                        <div className="song-card-img-container">
                                            <img className="song-card-img" src={"../albumBorito.jpg"} alt="" />
                                        </div>
                                    </div>
                                    <h4>{song.title}</h4>
                                    <p>{song.album_title}</p>
                                </div>
                            )
                        }) }

                    </div>



                </div>
            </div>

        </div>
    );
}