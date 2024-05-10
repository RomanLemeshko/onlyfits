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
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className='main-page-container'>
      <div>
        {isLoggedIn ? (
          <>
            <ul id="header-container">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/view-programms">Программы</Link></li>
              <li><Link to="/view-profile">Профиль</Link></li>
              <li><Link to="/chat-bot">Чат</Link></li>
              <li><button onClick={handleLogout}>Выйти</button></li>
            </ul>
            <div><h5>User: {user?.name}</h5></div>
          </>
        ) : (
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Зарегистрироваться</Link></li>
            <li><Link to="/login">Войти</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;