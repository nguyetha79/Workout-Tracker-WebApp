import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// Author: teasec4
// Date: Sep 26, 2022
// Title of source code: react doesn't update the data, only after reloading page
// Type: source code
// Web address: https://stackoverflow.com/questions/73853036/react-doesnt-update-the-data-only-after-reloading-page

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="logo" src={require('../components/Logo/workoutLogo.png')} alt="" />
        </Link>
        <nav >
          {user && (
            <div className="links" >
              <Link to="/">Home</Link>
              <Link to="/create">New Workout</Link>
            </div>
          )}
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
