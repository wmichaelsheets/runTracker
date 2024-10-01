import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <ul className="nav-bar">
        <li>
          <Link to={'/runs'}>Runs</Link>
        </li>
        <li>
          <Link to={'/shoes'}>Shoes</Link>
        </li>
        <li>
          <Link to={'/users'}>Users</Link>
        </li>
      </ul>
    </div>
  );
};
