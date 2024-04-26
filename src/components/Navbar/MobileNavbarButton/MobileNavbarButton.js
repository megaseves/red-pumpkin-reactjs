import './MobileNavbarButton.css';
import {Link, useLocation} from "react-router-dom";

export function MobileNavbarButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    const btnClass = isActive ? "menu-content active" : "menu-content";

  return (
    <Link to={props.to} className={"mobile-navbar-button"} >
            <div className={btnClass}>
                <p className="menu-title">{props.title}</p>
            </div>
    </Link>
  );
}