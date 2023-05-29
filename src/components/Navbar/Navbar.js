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
import {Link} from "react-router-dom";



export function Navbar({shufflePlayList, showPlayerComponent, closePlayerComponent}) {
  return (
    <div className="navbar-container">

        <div className="title">
            <Link to={"/"} onClick={() => closePlayerComponent()}><h2>🎃 Red Pumpkin</h2></Link>
        </div>
        <div className="navbar-menu-content">
            <NavbarButton title={"KEZDŐLAP"} to={"/"} icon={faPlay} closePlayerComponent={closePlayerComponent} />
{/*            <span className={"menu-content"} onClick={() => showPlayerComponent()} >
                <FontAwesomeIcon className="menu-icon" icon={faPlay} />
                <p className="menu-title">PLAYER</p>
            </span>*/}

            <span className={"navbar-button-random"} onClick={() => shufflePlayList()}>
                <FontAwesomeIcon className="menu-icon" icon={faShuffle} />
                <p className="menu-title">RANDOM</p>
            </span>


            <NavbarButton title={"ALBUMOK"} to={"/albums"} icon={faCompactDisc} closePlayerComponent={closePlayerComponent} />
            <NavbarButton title={"ESEMÉNYEK"} to={"/events"} icon={faCalendarCheck} closePlayerComponent={closePlayerComponent} />
            <NavbarButton title={"TAGOK"} to={"/members"} icon={faIdBadge} closePlayerComponent={closePlayerComponent} />
            <NavbarButton title={"ELÉRHETŐSÉG"} to={"/contacts"} icon={faAddressBook} closePlayerComponent={closePlayerComponent} />

        </div>

        <div className="right-content">

        </div>



    </div>
  );
}