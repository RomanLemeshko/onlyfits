import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import './header.css';
import { AppDispatch, RootState } from '../../store';

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);


  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className='main-page-container'>
      <div>
        {isLoggedIn ? (
          <>
          <div className='header-content'>
            <ul id="header-container" className="authenticated">
              <li><Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Main</Link></li>
              <li><Link to="/view-programms" className={location.pathname === "/view-programms" ? "active-link" : ""}>Programs</Link></li>
              <li><Link to="/view-profile" className={location.pathname === "/view-profile" ? "active-link" : ""}>Profile</Link></li>
              <li><Link to="/chat-bot" className={location.pathname === "/chat-bot" ? "active-link" : ""}>Chat</Link></li>
              <li><button className='btn-logout' onClick={handleLogout}>Logout</button></li>
            </ul>
            <div><h5>{user?.name}</h5></div>
          </div>
          </>
        ) : (
          <ul className="unauthenticated">
            <li><Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Home</Link></li>
            <li><Link to="/register" className={location.pathname === "/register" ? "active-link" : ""}>Sign up</Link></li>
            <li><Link to="/login" className={location.pathname === "/login" ? "active-link" : ""}>Sign in</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;