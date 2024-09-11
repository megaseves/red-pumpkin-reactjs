import { MobileNavbarButton } from '../MobileNavbarButton/MobileNavbarButton';
import {Link} from "react-router-dom";
import './MobileNavbar.css';


export function MobileNavbar({closePlayerComponent, toggleMobileNavbar}) {


  return (
    <div id='mobile-navbar' className="mobile-navbar-container hidePhoneMenu">
      <div className='mobil-nav-header'>
      <Link to={"/"} onClick={toggleMobileNavbar} ><h2>Red Pumpkin</h2></Link>
        <img id="xbar" src={"../tabler_x.png"} onClick={toggleMobileNavbar} />
      </div>
      <div className='mobil-nav-list'>
        <ul>
          <li onClick={toggleMobileNavbar}><MobileNavbarButton title={"Kezdőlap"} to={"/"} /></li>
          <li onClick={toggleMobileNavbar}><MobileNavbarButton title={"Albumok"} to={"albums"}  /></li>
          <li onClick={toggleMobileNavbar}><MobileNavbarButton title={"Események"} to={"/events"}  /></li>
          <li onClick={toggleMobileNavbar}><MobileNavbarButton title={"Tagok"} to={"/members"} /></li>
          <li onClick={toggleMobileNavbar}><MobileNavbarButton title={"Elérhetőség"} to={"/contacts"} /></li>
        </ul>
      </div>
        
    </div>
  );
}