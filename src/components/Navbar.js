import './Navbar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faCalendarCheck,
    faCompactDisc,
    faIdBadge,
    faPlay,
    faShuffle
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  return (
    <div className="navbar-container">

        <div className="menu-content active">
            <FontAwesomeIcon className="menu-icon" icon={faPlay} />
            <p className="menu-title">PLAYER</p>
        </div>
        <div className="menu-content">
            <FontAwesomeIcon className="menu-icon" icon={faShuffle} />
            <p className="menu-title">RANDOM</p>
        </div>
        <div className="menu-content">
            <FontAwesomeIcon className="menu-icon" icon={faCompactDisc} />
            <p className="menu-title">ALBUMS</p>
        </div>
        <div className="menu-content">
            <FontAwesomeIcon className="menu-icon" icon={faCalendarCheck} />
            <p className="menu-title">EVENTS</p>
        </div>
        <div className="menu-content">
            <FontAwesomeIcon className="menu-icon" icon={faIdBadge} />
            <p className="menu-title">MEMBERS</p>
        </div>
        <div className="menu-content">
            <FontAwesomeIcon className="menu-icon" icon={faAddressBook} />
            <p className="menu-title">CONTACTS</p>
        </div>

    </div>
  );
}