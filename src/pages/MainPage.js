import './Mainpage.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

export function MainPage(props) {

    const audio = useContext(AudioContext);


    return (
        <div className="mainpage-container">

            <div className="mainpage-header">
                <div className="mainpage-player">
                    <h3>Lejátszó megnyitása</h3>
                </div>

                <div className="mainpage-recommend">
                    <h2>Legújabb számok</h2>

                    <div className="song-card-container">

                        <div className="song-card">
                            <div className="song-card-link" onClick={() => props.changeSong(9)}>
                                <FontAwesomeIcon className={"song-card-icon"} icon={faPlay} />
                                <div className="song-card-img-container">
                                    <img className="song-card-img" src={"../albumBorito.jpg"} alt="" />
                                </div>
                            </div>
                            <h4>Fekete krónika</h4>
                            <p>Túlzó láng</p>
                        </div>

                        <div className="song-card">
                            <div className="song-card-link" onClick={() => props.changeSong(8)}>
                                <FontAwesomeIcon className={"song-card-icon"} icon={faPlay} />
                                <div className="song-card-img-container">
                                    <img className="song-card-img" src={"../albumBorito.jpg"} alt="" />
                                </div>
                            </div>
                            <h4>Halhatatlan jel</h4>
                            <p>Túlzó láng</p>
                        </div>

                        <div className="song-card">
                            <div className="song-card-link" onClick={() => props.changeSong(7)}>
                                <FontAwesomeIcon className={"song-card-icon"} icon={faPlay} />
                                <div className="song-card-img-container">
                                    <img className="song-card-img" src={"../albumBorito.jpg"} alt="" />
                                </div>
                            </div>
                            <h4>Időkerék</h4>
                            <p>Túlzó láng</p>
                        </div>


                    </div>



                </div>
            </div>

        </div>
    );
}