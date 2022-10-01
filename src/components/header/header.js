import { NavLink } from "react-router-dom";
import './header.css';
const Header = () => {

  return (
    <div className="header">
      <nav>
        <a id="title" href="#">
          Student Portal
        </a><ul>
            <li>
              <NavLink to="/student/add">Add Student</NavLink>
            </li>
          </ul>
      </nav>
    </div>
  );
};

export default Header;
