import './Contacts.css';
import {useContext} from "react";
import { AudioContext } from '../components/AudioContext';

export function Contacts() {

    const audio = useContext(AudioContext);

    
  return (
      <div className="contacts-container">
          <div className='contacts'>
            <h5>Megtalálsz Facebook-on vagy írj e-mail-t!</h5>
            <br />
            <h5>Facebook: <a href='https://www.facebook.com/attila.schmiedt' target='_blank'>Schmiedt Attila</a></h5>
            <h5>E-mail: <a href = "mailto: schmiedt.attila95@gmail.com">schmiedt.attila95@gmail.com</a></h5>
          </div>
      </div>
  );
}