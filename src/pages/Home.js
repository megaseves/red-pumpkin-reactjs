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
    const [currentSong, setCurrentSong] = useState(songsdata[0]);
    const [currentAlbum, setCurrentAlbum] = useState({});
    const [release, setRelease] = useState(songsdata.slice(0,3));

    const [auPlay, setAuPlay] = useState(false);

    const audioElem = useRef();

    const selectedName = "Túlzó láng";

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
    }, []);



    const selectAlbum = (selectedName) => {
        let songs = [];
        for (const key of Object.keys(songsdata)) {
            const val = songsdata[key];
            if (val.album_title === selectedName) {
                songs.push(val);
            }
        }
        setCurrentAlbum(songs);
    };

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const current_time = audioElem.current.currentTime;

        setCurrentSong({...currentSong, "progress": current_time / duration * 100, "length": duration});
    }


  return (
      <div className={"bg"} style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/bgPlayer.jpg'})`}}>

        <Router>
            <Navbar />
            <Routes>

                <Route path={"/"} element={
                    <>
                        <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} autoPlay />
                        <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} release={release}/>
                    </>
                }
                />
                <Route path={"/contacts"} element={<Contacts />} />
            </Routes>
        </Router>

      </div>
  );
}