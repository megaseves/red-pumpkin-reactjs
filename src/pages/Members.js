import './Members.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Members() {

    const audio = useContext(AudioContext);


    return (
        <div className="members-container">
            <h2>Members</h2>
        </div>
    );
}