import './Albums.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

export function Albums(props) {

    const audio = useContext(AudioContext);


    return (
        <div className="albums-container">

                <div className="album-card-container">
                    <div className="album-card">
                        <div className="album-card-link" >
                            <div className="album-card-icon-border" onClick={() => {
                                props.selectAlbum("Túlzó láng");
                                props.openPlayerComponent();
                            }}>
                                <FontAwesomeIcon className={"album-card-icon"} icon={faPlay} />
                            </div>
                            <div className="album-card-img-container">
                                <img className="album-card-img" src={"../albumBorito.jpg"} alt="" />
                            </div>
                        </div>
                        <h4>Túlzó láng</h4>
                        <p>Album</p>
                    </div>
                </div>

        </div>
    );
}