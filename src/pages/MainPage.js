import './Mainpage.css';
import './AudioPlayingAnimation.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faShuffle} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export function MainPage(props) {

    const songs = props.songs;

    var counter = 0;

    return (
        <div className="mainpage-container">
            <div id='home-bg'></div>
            <div className="mainpage-header">
                <div className='flex-break'>

                    <div className="mainpage-recommend mainpage-new-songs-container">
                        <div className='h6-header'>
                            <h6>Legújabb dalok</h6>
                            <Link to={'/album/tulzo-lang'}><p className='p-link'>Több</p></Link>
                        </div>

                        <div className='new-songs'>
                            <div className='album-songs-div-recommend'>

                                { songs && songs.slice(0,4).map((song, index) => {
                                        return (
                                            <div className='album-song album-song-recommended' key={song.id} onClick={() => props.changeSong(song.id)}>
                                                <p>{index+1}</p>
                                                <p className='album-song-title'>{song.title}</p>
                                                <p>{song.length}</p>
                                            </div>
                                        )
                                }) }
                                


                            </div>
                            <div className='new-song-album'>
                                <Link to={'/album/tulzo-lang'}>
                                    <img className="new-song-album-img" src={"../album_borito_tulzo_lang.webp"} alt="" />
                                </Link>
                            </div>
                        </div>

                    </div>

                    
                    <div className='mainpage-recommend others-mainpage mainpage-albums-container'>
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
                                        <img className="album-card-img-mainpage" src={"../album_borito_tulzo_lang.webp"} alt="" />
                                    </div>
                                </div>
                                </Link>
                                
                            </div>
                            <h3 className='random-btn-on-mainpage'>Túlzó láng album</h3>
                        </div>
                        <div className="second-mainpage-content">
                            
                            <div className="album-card-mainpage">
                                <Link to={'/album/demo'}><div className="album-card-link-mainpage">
                                    <div className="album-card-icon-border" onClick={() => {
                                        props.selectAlbum("Demó");
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
                            <h3 className='random-btn-on-mainpage'>Demó album</h3>
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
                                    
                            <div className='album-song album-song-recommended' key={8} onClick={() => props.changeSong(7)}>
                                <p>1</p>
                                <p className='album-song-title'>Bukott angyal</p>
                                <p>4:57</p>
                            </div>
                            <div className='album-song album-song-recommended' key={5} onClick={() => props.changeSong(9)}>
                                <p>2</p>
                                <p className='album-song-title'>Fekete krónika</p>
                                <p>4:12</p>
                            </div>
                            <div className='album-song album-song-recommended' key={2} onClick={() => props.changeSong(11)}>
                                <p>3</p>
                                <p className='album-song-title'>Szolgáló</p>
                                <p>3:55</p>
                            </div>
                            <div className='album-song album-song-recommended' key={9} onClick={() => props.changeSong(10)}>
                                <p>4</p>
                                <p className='album-song-title'>Belső háború</p>
                                <p>3:34</p>
                            </div>

                        </div>
                    </div>

                </div>


                    <div className="mainpage-recommend player-mainpage playing-now-container">
                        <div className='h6-header'>
                            <h6>Lejátszó</h6>
                            <p className='p-link' onClick={() => props.openPlayerComponent()}>Lejátszó megnyitása</p>
                        </div>

                        <div className='current-playing-container'>
                            {   props.isPlaying ?
                                <div className='playing-container' onMouseEnter={() => props.hoverPauseAudioOnMainpage()} onMouseLeave={() => props.leaveHoverPauseAudioOnMainpage()}>
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