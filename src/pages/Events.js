import './Events.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Events() {

    const audio = useContext(AudioContext);


    return (
        <div className="events-container">
            <h5>Egyelőre nincsenek események!</h5>
        </div>
    );
}