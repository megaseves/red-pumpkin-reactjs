import './NavbarButton.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation} from "react-router-dom";

export function NavbarButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    const btnClass = isActive ? "menu-content active" : "menu-content";

  return (
    <Link to={props.to} className={"navbar-button"} onClick={() => props.closePlayerComponent()} >
            <div className={btnClass}>
                <FontAwesomeIcon className="menu-icon" icon={props.icon} />
                <p className="desktop-menu">{props.title}</p>
            </div>
    </Link>
  );
}