import { Link } from "react-router-dom";
import logo from "../assets/ForestGeoLogo.png";
import { useConnectivityContext } from "../context/connectivityContext";
import "./nav.css";

export const Nav = () => {
  const { isOnline } = useConnectivityContext();

  return (
    <nav className="topnav">
      <img src={logo} alt="The logo of ForestGEO - Global Earth Observatory Network" width="150" className="logo" />
      <ul role="menubar" className="menu">
        <li role="menuitem">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">Old Tree form</Link>
        </li>
      </ul>
      <div className="networkIcon">
        <i
          className={`ms-Icon ms-Icon--${
            isOnline ? "PlugConnected" : "PlugDisconnected"
          }`}
          aria-label={
            isOnline
              ? "Connected to the Internet"
              : "Disconnected from the Internet"
          }
        />
      </div>
    </nav>
  );
};

Nav.defaultName = "Nav";