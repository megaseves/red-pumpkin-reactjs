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
    const [playList, setPlayList] = useState({});
    const [release] = useState(songsdata.slice(0,3));


    const audioElem = useRef();

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
                        <Player playList={playList} songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} release={release}/>
                    </>
                }
                />
                <Route path={"/contacts"} element={<Contacts />} />
            </Routes>
        </Router>

      </div>
  );
}