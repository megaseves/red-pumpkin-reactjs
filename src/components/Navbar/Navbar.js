import './Navbar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faCalendarCheck,
    faCompactDisc,
    faIdBadge, faPlay,
    faShuffle
} from "@fortawesome/free-solid-svg-icons";
import {NavbarButton} from "./NavbarButton/NavbarButton";

export function Navbar() {
  return (
    <div className="navbar-container">

        <NavbarButton title={"PLAYER"} to={"/"} icon={faPlay} />
        <NavbarButton title={"RANDOM"} to={"/random"} icon={faShuffle} />
        <NavbarButton title={"ALBUMS"} to={"/albums"} icon={faCompactDisc} />
        <NavbarButton title={"EVENTS"} to={"/events"} icon={faCalendarCheck} />
        <NavbarButton title={"MEMBERS"} to={"/members"} icon={faIdBadge} />
        <NavbarButton title={"CONTACTS"} to={"/contacts"} icon={faAddressBook} />

    </div>
  );
}