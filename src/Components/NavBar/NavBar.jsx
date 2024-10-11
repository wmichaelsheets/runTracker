import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <ul className="nav-bar">
        <li className="dropdown">
          <span className="dropbtn">Runs</span>
          <div className="dropdown-content">
            <Link to="/runs/enter">Enter a Run</Link>
            <Link to="/runs/by-shoe">View Runs by Shoe</Link>
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn">Shoes</span>
          <div className="dropdown-content">
            <Link to="/shoes/enter">Enter a Shoe</Link>
            <Link to="/shoes/all">View all Shoes</Link>
          </div>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>
    </div>
  )
}