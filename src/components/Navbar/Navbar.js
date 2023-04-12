import './Navbar.css';
import {
    faAddressBook,
    faCalendarCheck,
    faCompactDisc,
    faIdBadge, faPlay,
    faShuffle
} from "@fortawesome/free-solid-svg-icons";
import {NavbarButton} from "./NavbarButton/NavbarButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Navbar({shufflePlayList}) {
  return (
    <div className="navbar-container">


        <NavbarButton title={"PLAYER"} to={"/"} icon={faPlay} />
        <span className={"navbar-button-random"} onClick={() => shufflePlayList()}>
            <FontAwesomeIcon className="menu-icon" icon={faShuffle} />
            <p className="menu-title">RANDOM</p>
        </span>
        <NavbarButton title={"ALBUMS"} to={"/albums"} icon={faCompactDisc} />
        <NavbarButton title={"EVENTS"} to={"/events"} icon={faCalendarCheck} />
        <NavbarButton title={"MEMBERS"} to={"/members"} icon={faIdBadge} />
        <NavbarButton title={"CONTACTS"} to={"/contacts"} icon={faAddressBook} />

    </div>
  );
}