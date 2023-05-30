import './Albums.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Albums() {

    const audio = useContext(AudioContext);


    return (
        <div className="albums-container">

        </div>
    );
}