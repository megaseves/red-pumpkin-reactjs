import './Contacts.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Contacts() {

    const audio = useContext(AudioContext);

    
  return (
      <div className="contacts-container">
          <div className='contacts'>
            <h2>Megtalálsz Facebook-on vagy írj e-mailben!</h2>
            <br />
            <h2>Facebook: <a href='https://www.facebook.com/attila.schmiedt' target='_blank'>Schmiedt Attila</a></h2>
            <h2>E-mail: <a href = "mailto: megaseves@gmail.com">megaseves@gmail.com</a></h2>
          </div>
      </div>
  );
}