import './Mainpage.css';
import './AudioPlayingAnimation.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faShuffle} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export function MainPage(props) {

    const songs = props.songs;

    const hoverPauseAudioOnMainpage = () => {
        const notPlayingIcon = document.querySelector(".not-playing-icon-pause");
        notPlayingIcon.classList.remove("close");
    };
    const leaveHoverPauseAudioOnMainpage = () => {
        const notPlayingIcon = document.querySelector(".not-playing-icon-pause");
        notPlayingIcon.classList.add("close");
    };

    return (
        <div className="mainpage-container">

            <div className="mainpage-header">
                <div className='flex-break'>

                    <div className="mainpage-recommend">
                        <div className='h6-header'>
                            <h6>Legújabb dalok</h6>
                            <Link to={'/album/tulzo-lang'}><p className='p-link'>Összes megtekintés</p></Link>
                        </div>
                        

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
                                        <div className='song-card-details'>
                                            <h3>{song.title}</h3>
                                            <Link to={'/album/tulzo-lang'}><p>{song.album_title}</p></Link>
                                        </div>
                                        
                                    </div>
                                )
                            }) }

                        </div>
                    </div>

                    

                    
                    <div className='mainpage-recommend others-mainpage'>
                        <div className="second-mainpage-content">
                            <div className="mainpage-player" onClick={() => props.randomPlaySong()}>
                                <FontAwesomeIcon className={"mainpage-random-btn-icon"} icon={faShuffle} />
                            </div>
                            <h3 className='random-btn-on-mainpage'>Random lejátszás</h3>
                        </div>
                        <div className="second-mainpage-content">
                            
                            <div className="album-card-mainpage">
                                <Link to={'/album/tulzo-lang'}><div className="album-card-link-mainpage">
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
                                    <div className="album-card-img-container-mainpage">
                                        <img className="album-card-img-mainpage" src={"../albumBorito.webp"} alt="" />
                                    </div>
                                </div>
                                </Link>
                                
                            </div>
                            <h3 className='random-btn-on-mainpage'>Túlzó láng album</h3>
                        </div>

                    </div>




                </div>

                <div className='flex-break'>


                    <div className="mainpage-recommend">
                        <div className='h6-header'>
                            <h6>Ajánlott</h6>
                            <Link to={'/album/tulzo-lang'}><p className='p-link'>Összes megtekintés</p></Link>
                        </div>
                        <div className='recommended-playlist'>
                        <div className='album-songs-div-recommend'>
                                    
                            <div className='album-song album-song-recommended' key={8} onClick={() => props.changeSong(8)}>
                                <p>1</p>
                                <p className='album-song-title'>Halhatatlan jel</p>
                                <p>5:22</p>
                            </div>
                            <div className='album-song album-song-recommended' key={5} onClick={() => props.changeSong(5)}>
                                <p>2</p>
                                <p className='album-song-title'>Tűzhordozó</p>
                                <p>4:42</p>
                            </div>
                            <div className='album-song album-song-recommended' key={2} onClick={() => props.changeSong(2)}>
                                <p>3</p>
                                <p className='album-song-title'>Titkos alagút</p>
                                <p>3:02</p>
                            </div>
                            <div className='album-song album-song-recommended' key={9} onClick={() => props.changeSong(9)}>
                                <p>4</p>
                                <p className='album-song-title'>Fekete krónika</p>
                                <p>4:12</p>
                            </div>

                            </div>
                        </div>
                    </div>


                    <div className="mainpage-recommend player-mainpage">
                        <div className='h6-header'>
                            <h6>Lejátszó</h6>
                            <p className='p-link' onClick={() => props.openPlayerComponent()}>Lejátszó megnyitása</p>
                        </div>

                        <div className='current-playing-container'>
                            {   props.isPlaying ?
                                <div className='playing-container' onMouseEnter={() => hoverPauseAudioOnMainpage()} onMouseLeave={() => leaveHoverPauseAudioOnMainpage()}>
                                    <FontAwesomeIcon className={"play-audio not-playing-icon-pause close"} icon={faPause} onClick={() => props.playPause()} />
                                    <div class="playing" >
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
                                <div className='not-playing-container'>
                                    <FontAwesomeIcon className={"play-audio not-playing-icon"} icon={faPlay} onClick={() => props.playPause()} />
                                    <div className='not-playing'>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                        <span class="not_playing__bar"></span>
                                    </div>
                                </div>
                            }
                            
                            <div className='current-playing-div'>
                                <div className='current-playing-title'>{props.currentSong && props.currentSong.title}</div>
                                <div className='current-playing-album-title'><p>{props.currentSong && props.currentSong.album_title}</p></div>
                            </div>
                        </div>

                    </div>


                </div>


            </div>

        </div>
    );
}