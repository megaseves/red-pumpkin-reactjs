import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navbar} from "../components/Navbar/Navbar";
import {Player} from "./Player/Player";
import {Contacts} from "./Contacts";
import { songsdata } from "../audios/audios.js"
import {useEffect, useRef, useState} from "react";
import { AudioContext } from '../components/AudioContext';
import './Home.css';
import {PlayerBottomComponent} from "./Player/PlayerBottomComponent";

export function Home() {

    const [songs, setSongs] = useState(songsdata);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(true);
    const [currentSong, setCurrentSong] = useState(songsdata[0]);
    const [playList, setPlayList] = useState({});
    const [release] = useState(songsdata.slice(0,3));

    const audioElem = useRef();

    const clickRef = useRef();


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

    //console.log(currentSong)

    useEffect(() => {
/*        const prevValue = isPlaying;
        setIsPlaying(!prevValue);*/
        if(isPlaying) {
            (audioElem.current) && audioElem.current.play();
        } else {
            (audioElem.current) && audioElem.current.pause();
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
        const repeatBtn = document.querySelector('#toggleBtn');

        if (repeatBtn.dataset.active === 'non-active') {
            setIsRepeat(true);
            console.log('Aktiválja');
            repeatBtn.dataset.active = 'active';
        } else {
            setIsRepeat(false);
            console.log('Deaktiválja');
            repeatBtn.dataset.active = 'non-active';
        }
    };

    const shufflePlayList = () => {
        const shuffledArray = playList.sort((a, b) => 0.5 - Math.random());
        if (!isPlaying) {
            setIsPlaying(true);
            audioElem.current.play();
        }
        setPlayList(shuffledArray);
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
    useEffect(() => {
        document.addEventListener('keyup', function(event) {
            // 32 = space bar
            if (event.keyCode === 32) {
                PlayPause();
            }
        });
    });


  return (
      <div className={"bg"} style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/bgPlayer.jpg'})`}}>
        <AudioContext.Provider value={currentSong}>
            <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} onEnded={endedAudio} autoPlay />
            <Router>
                <Navbar shufflePlayList={shufflePlayList} />
                <PlayerBottomComponent isPlaying={isPlaying} PlayPause={PlayPause} skipBack={skipBack} skipForward={skipForward} setIsRepeat={setIsRepeat} toggleRepeat={toggleRepeat} audioElem={audioElem} minutes={minutes} seconds={seconds} currentSong={currentSong} converter={converter} shufflePlayList={shufflePlayList} checkWidth={checkWidth} clickRef={clickRef} />
                <Routes>

                    <Route path={"/"} element={
                        <>
                            <Player PlayPause={PlayPause} skipBack={skipBack} skipForward={skipForward} toggleRepeat={toggleRepeat} shufflePlayList={shufflePlayList} setPlayList={setPlayList} isRepeat={isRepeat} setIsRepeat={setIsRepeat} selectAlbum={selectAlbum} playList={playList} songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} release={release} seconds={seconds} minutes={minutes} converter={converter} checkWidth={checkWidth} />
                        </>
                    }
                    />

                    <Route path={"/contacts"} element={<Contacts audioElem={audioElem} setIsPlaying={setIsPlaying} />} />

                </Routes>
            </Router>
        </AudioContext.Provider>
      </div>
  );
}