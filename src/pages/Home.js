import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navbar} from "../components/Navbar/Navbar";
import {Player} from "./Player";
import {Contacts} from "./Contacts";
import { songsdata } from "../audios/audios.js"
import {useEffect, useRef, useState} from "react";
import './Home.css';

export function Home() {

    const [songs, setSongs] = useState(songsdata);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(true);
    const [currentSong, setCurrentSong] = useState(songsdata[0]);
    const [playList, setPlayList] = useState({});
    const [release] = useState(songsdata.slice(0,3));


    const audioElem = useRef();

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
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }, [isPlaying]);

    //console.log(release)
    useEffect(() => {
        selectAlbum(selectedName);
        //console.log(currentAlbum)
    }, [setIsPlaying]);



    const selectAlbum = (selectedName) => {
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

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const current_time = audioElem.current.currentTime;

        setCurrentSong({...currentSong, "progress": current_time / duration * 100, "seconds": current_time , "length": duration});
    }


  return (
      <div className={"bg"} style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/bgPlayer.jpg'})`}}>

        <Router>
            <Navbar />
            <Routes>

                <Route path={"/"} element={
                    <>
                        <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} onEnded={endedAudio} autoPlay />
                        <Player isRepeat={isRepeat} setIsRepeat={setIsRepeat} selectAlbum={selectAlbum} playList={playList} songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} release={release}/>
                    </>
                }
                />
                <Route path={"/contacts"} element={<Contacts audioElem={audioElem} setIsPlaying={setIsPlaying} />} />
            </Routes>
        </Router>

      </div>
  );
}