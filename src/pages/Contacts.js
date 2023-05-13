import './Contacts.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Contacts() {

    const audio = useContext(AudioContext);

    
  return (
      <div className="contacts-container">
        <h2>Contacts</h2>
      </div>
  );
}