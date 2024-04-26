import { MobileNavbarButton } from '../MobileNavbarButton/MobileNavbarButton';
import './MobileNavbar.css';



export function MobileNavbar({closePlayerComponent}) {
  return (
    <div className="mobile-navbar-container">
        <ul>
          <li><MobileNavbarButton title={"KEZDŐLAP"} to={"/"} closePlayerComponent={closePlayerComponent} /></li>
          <li><MobileNavbarButton title={"ALBUMOK"} to={"/"} closePlayerComponent={closePlayerComponent} /></li>
          <li><MobileNavbarButton title={"ESEMÉNYEK"} to={"/"} closePlayerComponent={closePlayerComponent} /></li>
          <li><MobileNavbarButton title={"TAGOK"} to={"/"} closePlayerComponent={closePlayerComponent} /></li>
          <li><MobileNavbarButton title={"ELÉRHETŐSÉG"} to={"/"} closePlayerComponent={closePlayerComponent} /></li>
        </ul>
    </div>
  );
}