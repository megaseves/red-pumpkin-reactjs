import './Events.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Events() {

    const audio = useContext(AudioContext);


    return (
        <div className="events-container">
            <h2>Egyelőre nincsenek események!</h2>
        </div>
    );
}