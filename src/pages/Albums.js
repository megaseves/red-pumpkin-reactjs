import './Albums.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export function Albums(props) {


    return (
        <div className="albums-container">

                <div className="album-card-container">
                    <div className="album-card">
                        <Link to={'/album/tulzo-lang'}><div className="album-card-link">
                                <div className="album-card-icon-border" onClick={() => {
                                    props.selectAlbum("Túlzó láng");
                                    props.openPlayerComponent();
                                }}>
                                    <FontAwesomeIcon className={"album-card-icon"} icon={faPlay} />
                                </div>
                                <div className="album-card-img-container">
                                    <img className="album-card-img" src={"../TulzoLangAlbumBoritoSmall.webp"} alt="" />
                                </div>
                            </div>
                        
                        <h4 className='album-title-h'>Túlzó láng</h4>
                        </Link>
                        <p>Album</p>
                    </div>
                </div>

        </div>
    );
}