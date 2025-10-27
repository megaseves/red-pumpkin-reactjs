import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navbar} from "../components/Navbar/Navbar";
import {Player} from "./Player/Player";
import {Contacts} from "./Contacts";
import { songsdata } from "../audios/audios.js"
import {useEffect, useRef, useState} from "react";
import { AudioContext } from '../components/AudioContext';
import './Home.css';
import {PlayerBottomComponent} from "./Player/PlayerBottomComponent";
import {MainPage} from "./MainPage";
import {Albums} from "./Albums";
import {Members} from "./Members";
import {Events} from "./Events";
import { TulzoLangAlbum } from "./albums/TulzoLangAlbum";
import { MobileNavbar } from "../components/Navbar/MobileNavbar/MobileNavbar.js";


export function Home() {

    const audioElem = useRef();
    const [songs, setSongs] = useState(songsdata);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(true);
    const [currentSong, setCurrentSong] = useState(songsdata[0]);
    const [playList, setPlayList] = useState(songs);
    const [release] = useState(songsdata.slice(0,3));
    const [isActiveVolumeModal, setIsActiveVolumeModal] = useState(true);
    const [currentVolume, setCurrentVolume] = useState(audioElem.current !== undefined ? audioElem.current.volume : 1)

    const clickRef = useRef();
    const clickRefBottom = useRef();
    const bottomPlayerRef = useRef();

    const [isBuffering, setIsBuffering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [duration, setDuration] = useState(0);


    let minutes = (audioElem.current) ? Math.floor(audioElem.current.duration / 60) : 0;
    let secondData = (audioElem.current) ? Math.floor((audioElem.current.duration - minutes * 60)) : 0;
    let seconds = secondData < 10 ? "0" + secondData : secondData;

    const endedAudio = () => {
        const index = playList.findIndex(x=>x.title === currentSong.title);
        if(isRepeat) {
            setCurrentSong(playList[index]);
            audioElem.current.play();
        } else {
            if (index === playList.length -1) {
                setCurrentSong(playList[0]);
            } else {
                setCurrentSong(playList[index + 1]);
            }
        }
    };

    const selectedName = "Túlzó láng";

    useEffect(() => {
        // Lejátszás vagy szünet állapot alapján történő akciók
        if (isPlaying) {
          audioElem.current && audioElem.current.play();
        } else {
          audioElem.current && audioElem.current.pause();
        }
      }, [isPlaying]); 


    useEffect(() => {
        selectAlbum(selectedName);
        // eslint-disable-next-line
        minutes = (audioElem.current) ? Math.floor(audioElem.current.duration / 60) : 0;
        // eslint-disable-next-line
        secondData = (audioElem.current) ? Math.floor((audioElem.current.duration - minutes * 60)) : 0;
        // eslint-disable-next-line
        seconds = secondData < 10 ? "0" + secondData : secondData;
        //console.log(currentAlbum)
    }, [setIsPlaying]);

    const converter = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let extraSeconds = seconds % 60;
        //minutes = minutes < 10 ? "0" + minutes : minutes;
        extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

        return minutes + ':' + extraSeconds;
    };

    const handleCanPlayThrough = () => {
        setIsBuffering(false);
        audioElem.current.play();
    };

    const handleWaiting = () => {
        setIsBuffering(true);
    };

    
    useEffect(() => {
        const audio = audioElem.current;
    
        // Frissíti a lejátszott időt
        const handleTimeUpdate = () => {
          if (audio.duration > 0) {
            setProgress((audio.currentTime / audio.duration) * 100);
          }
        };
    
        // Frissíti a pufferelt állapotot
        const handleProgress = () => {
          if (audio.buffered.length > 0) {
            const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
            if (audio.duration > 0) {
              setBuffered((bufferedEnd / audio.duration) * 100);
            }
          }
        };
    
        // Ha megvan a teljes időtartam, frissítjük
        const handleLoadedMetadata = () => {
          setDuration(audio.duration);
        };
    
        // Eseményfigyelők hozzáadása
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('progress', handleProgress);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
        // Tisztítás: eseményfigyelők eltávolítása
        return () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('progress', handleProgress);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }, []);
    


    const selectAlbum = (selectedName) => {
        setIsRepeat(false);
        let songs = [];
        for (const key of Object.keys(songsdata)) {
            const val = songsdata[key];
            if (val.album_title === selectedName) {
                songs.push(val);
            }

        }
        setPlayList(songs);
        setCurrentSong(songs[0]);
    };

    const PlayPause = () => {
        setIsPlaying(!isPlaying);
        audioElem.current.volume = currentVolume;
    }

    const skipBack = () => {
        setIsPlaying(true);
        const index = playList.findIndex(x=>x.title === currentSong.title);

        if (currentSong.seconds > 4) {
            audioElem.current.currentTime = 0;
        } else {
            if (index === 0) {
                setCurrentSong(playList[playList.length -1]);
            } else {
                setCurrentSong(playList[index - 1]);
            }
        }
    }
    const skipForward = () => {
        setIsPlaying(true);
        const index = playList.findIndex(x=>x.title === currentSong.title);

        if (index === playList.length -1) {
            setCurrentSong(playList[0]);
        } else {
            setCurrentSong(playList[index + 1]);
        }
    }

    const toggleRepeat = () => {
        const repeatBtn = document.querySelectorAll('#toggleBtn');

        if (repeatBtn[0].dataset.active === 'non-active') {
            setIsRepeat(true);
            console.log('Aktiválja');
            repeatBtn[0].dataset.active = 'active';
            repeatBtn[1].dataset.active = 'active';
        } else {
            setIsRepeat(false);
            console.log('Deaktiválja');
            repeatBtn[0].dataset.active = 'non-active';
            repeatBtn[1].dataset.active = 'non-active';
        }
    };

    const shufflePlayList = () => {
        const shuffledArray = playList.sort((a, b) => 0.5 - Math.random());

        if (!isPlaying) {
            setIsPlaying(true);
            audioElem.current.play();
        }

        setPlayList(shuffledArray);

        openPlayerComponent();
    };


    const randomPlaySong = () => {
        const shuffledArray = playList.sort((a, b) => 0.5 - Math.random());

        setPlayList(shuffledArray);

        if (currentSong.id !== shuffledArray[0].id) {
            setCurrentSong(shuffledArray[0]);
        } else {
            setCurrentSong(shuffledArray[1]);
        }


        if (!isPlaying) {
            setIsPlaying(true);
            audioElem.current.play();
        }

        openPlayerComponent();
    };



    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const current_time = audioElem.current.currentTime;
        const current_volume = audioElem.current.volume;

        setCurrentSong({...currentSong, "progress": current_time / duration * 100, "seconds": current_time , "length": duration, "volume": current_volume});
    }

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        
        const divProgress = offset / width * 100;
        if (audioElem.current.currentTime !== 0) {
            audioElem.current.currentTime = divProgress / 100 * currentSong.length;
        }
    }

    const checkWidthBottom = (e) => {
        let width = clickRefBottom.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        
        const divProgress = offset / width * 100;
        if (audioElem.current.currentTime !== 0) {
            audioElem.current.currentTime = divProgress / 100 * currentSong.length;
        }
    }


    useEffect(() => {
        document.addEventListener('keyup', function(event) {
            // 32 = space bar
            if (event.keyCode === 32) {
                PlayPause();
            }
        });
    });

    const showPlayerComponent = (e) => {
        const allPage = document.getElementById("all-page");
        const playerComponent = document.querySelector(".player-container");
        const backToPlayerDiv = document.querySelector(".back-to-player");
        
        const playerBottomComponentContainer = document.querySelector(".player-bottom-component-container");
        const navbarContainer = document.querySelector(".navbar-container");

        const clickedOnRef = bottomPlayerRef.current && bottomPlayerRef.current.contains(e.target);
        if (!clickedOnRef) {
            if (playerComponent.classList.contains("open")) {
                playerComponent.classList.remove("open");
                playerBottomComponentContainer.classList.remove("hide");
                navbarContainer.classList.remove("hide");
                backToPlayerDiv.classList.remove("close");
                allPage.classList.remove("hide");
                allPage.classList.remove("hideDesktop");   
            } else {
                playerComponent.classList.add("open");
                playerBottomComponentContainer.classList.add("hide");
                navbarContainer.classList.add("hide");
                backToPlayerDiv.classList.add("close");  
                allPage.classList.add("hide");
                allPage.classList.add("hideDesktop");
            }
        }
        
    }

    const openPlayerComponent = () => {
        const allPage = document.getElementById("all-page");
        const playerComponent = document.querySelector(".player-container");
        const backToPlayerDiv = document.querySelector(".back-to-player");
        
        const playerBottomComponentContainer = document.querySelector(".player-bottom-component-container");
        const navbarContainer = document.querySelector(".navbar-container");

        if (!playerComponent.classList.contains("open")) {
            playerComponent.classList.add("open");
            playerBottomComponentContainer.classList.add("hide");
            navbarContainer.classList.add("hide");
            backToPlayerDiv.classList.add("close");
            allPage.classList.add("hide");
            allPage.classList.add("hideDesktop");
        }
    }

    const closePlayerComponent = () => {
        const allPage = document.getElementById("all-page");
        const playerComponent = document.querySelector(".player-container");
        const backToPlayerDiv = document.querySelector(".back-to-player");
        
        const playerBottomComponentContainer = document.querySelector(".player-bottom-component-container");
        const navbarContainer = document.querySelector(".navbar-container");

        if (playerComponent.classList.contains("open")) {
            playerComponent.classList.remove("open");
            playerBottomComponentContainer.classList.remove("hide");
            backToPlayerDiv.classList.remove("close");
            navbarContainer.classList.remove("hide");
            allPage.classList.remove("hide");
            allPage.classList.remove("hideDesktop");
        }
    }

    const changeSong = (index) => {
        setIsPlaying(true);
        const songIndex = songs.findIndex(x => x.id === index);
        setCurrentSong(songs[songIndex]);

        openPlayerComponent();
        window.scrollTo(0, 0);
    }

    const volumeMute = () => {
        if (audioElem.current.volume > 0) {
            audioElem.current.volume = 0;
        } else {
            if (currentVolume === 0) {
                audioElem.current.volume = 0.3;
            } else {
                audioElem.current.volume = currentVolume;
            }
            
        }
    };

    const hoverPauseAudioOnMainpage = () => {
        const notPlayingIcon = document.querySelector(".not-playing-icon-pause");
        notPlayingIcon.classList.remove("close");
    };
    const leaveHoverPauseAudioOnMainpage = () => {
        const notPlayingIcon = document.querySelector(".not-playing-icon-pause");
        notPlayingIcon.classList.add("close");
    };


    useEffect(() => {
        if (isPlaying) {
            document.title = currentSong.title + " - Red Pumpkin";
        } else {
            document.title = "Red Pumpkin | Official website";
        }
    }, [isPlaying, skipBack, skipForward]);

    const toggleMobileNavbar = () => {
        const mobileNavbar = document.getElementById("mobile-navbar");
        const allPage = document.getElementById("all-page");
    
        if(mobileNavbar.classList.contains('hidePhoneMenu')) {
            mobileNavbar.classList.remove('hidePhoneMenu');
            allPage.classList.add('hidePhoneMenu');
        } else {
            mobileNavbar.classList.add('hidePhoneMenu');
            allPage.classList.remove('hidePhoneMenu');
        }
        closePlayerComponent();
    }


  return (
      <div>
        <AudioContext.Provider value={currentSong}>
            <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} onEnded={endedAudio} preload="auto" onCanPlayThrough={handleCanPlayThrough} onWaiting={handleWaiting} id="audio" />
            <Router>
                <MobileNavbar toggleMobileNavbar={toggleMobileNavbar} />    
                <Navbar toggleMobileNavbar={toggleMobileNavbar} shufflePlayList={shufflePlayList} openPlayerComponent={openPlayerComponent} closePlayerComponent={closePlayerComponent} />
                <PlayerBottomComponent isPlaying={isPlaying} PlayPause={PlayPause} skipBack={skipBack} skipForward={skipForward} checkWidthBottom={checkWidthBottom} clickRefBottom={clickRefBottom} setIsRepeat={setIsRepeat} toggleRepeat={toggleRepeat} audioElem={audioElem} minutes={minutes} seconds={seconds} currentSong={currentSong} converter={converter} shufflePlayList={shufflePlayList} checkWidth={checkWidth} clickRef={clickRef} showPlayerComponent={showPlayerComponent} bottomPlayerRef={bottomPlayerRef} openPlayerComponent={openPlayerComponent} isActiveVolumeModal={isActiveVolumeModal} setIsActiveVolumeModal={setIsActiveVolumeModal} volumeMute={volumeMute} setCurrentVolume={setCurrentVolume} currentVolume={currentVolume} buffered={buffered} />
                <Player PlayPause={PlayPause} skipBack={skipBack} skipForward={skipForward} toggleRepeat={toggleRepeat} shufflePlayList={shufflePlayList} clickRef={clickRef} setPlayList={setPlayList} isRepeat={isRepeat} setIsRepeat={setIsRepeat} selectAlbum={selectAlbum} playList={playList} songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} release={release} seconds={seconds} minutes={minutes} converter={converter} checkWidth={checkWidth} hoverPauseAudioOnMainpage={hoverPauseAudioOnMainpage} leaveHoverPauseAudioOnMainpage={leaveHoverPauseAudioOnMainpage} closePlayerComponent={closePlayerComponent} ChangeSong={changeSong} />
                
                <div id="all-page" >
                    <Routes>
                        
                            <Route path={"/"} element={
                                <>
                                    <MainPage changeSong={changeSong} songs={songs} shufflePlayList={shufflePlayList} randomPlaySong={randomPlaySong} selectAlbum={selectAlbum} openPlayerComponent={openPlayerComponent} PlayPause={PlayPause} isPlaying={isPlaying} playList={playList} currentSong={currentSong} playPause={PlayPause} hoverPauseAudioOnMainpage={hoverPauseAudioOnMainpage} leaveHoverPauseAudioOnMainpage={leaveHoverPauseAudioOnMainpage} />
                                </>
                            }
                            />
                        

                        <Route path={"/albums"} element={<Albums selectAlbum={selectAlbum} openPlayerComponent={openPlayerComponent} /> } />
                        <Route path={"/album/tulzo-lang"} element={<TulzoLangAlbum selectAlbum={selectAlbum} openPlayerComponent={openPlayerComponent} changeSong={changeSong} playList={playList} />} />
                        <Route path={"/events"} element={<Events />} />
                        <Route path={"/members"} element={<Members />} />
                        <Route path={"/contacts"} element={<Contacts />} />
                    </Routes>
                </div>

            </Router>
        </AudioContext.Provider>
      </div>
  );
}