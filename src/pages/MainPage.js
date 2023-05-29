import './Mainpage.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function MainPage() {

    const audio = useContext(AudioContext);


    return (
        <div className="mainpage-container">
            <h2>Main Page</h2>
        </div>
    );
}