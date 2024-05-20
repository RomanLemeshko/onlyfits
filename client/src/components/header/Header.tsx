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
      <div className='header-container'>
        {isLoggedIn ? (
          <>
          <div className='header-content'>
          <Link to="/">
            <div className="logo-header">
              <img src="https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/onlyfits_logotype.png?alt=media&token=3e929633-b844-48cd-9158-1a8a2581c6de" alt="onlyfits_logo" />
            </div>
          </Link>
            <div>

            <ul id="header-container" className="authenticated">
              <li><Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Main</Link></li>
              <li><Link to="/view-programms" className={location.pathname === "/view-programms" ? "active-link" : ""}>Programs</Link></li>
              <li><Link to="/view-profile" className={location.pathname === "/view-profile" ? "active-link" : ""}>Profile</Link></li>
              <li><Link to="/chat" className={location.pathname === "/chat" ? "active-link" : ""}>Chat</Link></li>
              <li><button className='btn-logout' onClick={handleLogout}>Logout</button></li>
            </ul>
            </div>
            <div><h5>{user?.name}</h5></div>
          </div>
          </>
        ) : (
          <>
          <div className='header-content'>
            <Link to="/">
            <div className="logo-header">
              <img src="https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/onlyfits_logotype.png?alt=media&token=3e929633-b844-48cd-9158-1a8a2581c6de" alt="onlyfits_logo" />
            </div>
            </Link>
            <ul className="unauthenticated">
              <li><Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Home</Link></li>
              <li><Link to="/register" className={location.pathname === "/register" ? "active-link" : ""}>Sign up</Link></li>
              <li><Link to="/login" className={location.pathname === "/login" ? "active-link" : ""}>Sign in</Link></li>
            </ul>
            <p>UserUserUserUserUserUser</p>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;