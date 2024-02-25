import './Navbar.css';
import {
    faAddressBook,
    faCalendarCheck,
    faCompactDisc, faHouse,
    faIdBadge, faPlay,
    faShuffle, faBars
} from "@fortawesome/free-solid-svg-icons";
import {NavbarButton} from "./NavbarButton/NavbarButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";



export function Navbar({shufflePlayList, openPlayerComponent, closePlayerComponent}) {
  return (
    <div className="navbar-container">

        <div className="title">
            <Link to={"/"} onClick={() => closePlayerComponent()}><h2>🎃 Red Pumpkin</h2></Link>
        </div>
        <div className='navbar-menu-content-container'>

            <div className="navbar-menu-content">
                <NavbarButton title={"KEZDŐLAP"} to={"/"} icon={faHouse} closePlayerComponent={closePlayerComponent} />
                <NavbarButton title={"ALBUMOK"} to={"/albums"} icon={faCompactDisc} closePlayerComponent={closePlayerComponent} />
                <NavbarButton title={"ESEMÉNYEK"} to={"/events"} icon={faCalendarCheck} closePlayerComponent={closePlayerComponent} />
                <NavbarButton title={"TAGOK"} to={"/members"} icon={faIdBadge} closePlayerComponent={closePlayerComponent} />
                <NavbarButton title={"ELÉRHETŐSÉG"} to={"/contacts"} icon={faAddressBook} closePlayerComponent={closePlayerComponent} />
            </div>

            <div className='navbar-menu-on-phone'>
                <div className='menu-icon-phone-main-btn'><Link to={"/"}><h3>Kezdőlap</h3></Link></div>
                <div className='menu-icon-phone-div'>
                    <FontAwesomeIcon icon={faBars} className='menu-icon-phone' />
                </div>
                
            </div>

        </div>

        <div className="right-content">

        </div>



    </div>
  );
}