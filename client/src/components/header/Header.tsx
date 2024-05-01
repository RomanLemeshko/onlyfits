import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';

type RootState = {
  auth: {
    isLoggedIn: boolean;
    accessToken: string | null;
    user: {
      id: number;
      name: string;
    };
  };
};

const Header = () => {

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className='main-page-container'>
      <div>
        {isLoggedIn ? (
          <>
            <ul id="header-container">
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/view-programms">Программы</Link>
              </li>
              <li>
                <Link to="/view-profile">Профиль</Link>
              </li>
              <li>
                <Link to="/chat-bot">Чат</Link>
              </li>
              <li>
                <Link to="/logout">Выйти</Link>
              </li>
            </ul>
            <div>
              <h5>User: {user?.name}</h5>
            </div>
          </>
        ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Зарегистрироваться</Link>
            </li>
            <li>
              <Link to="/login">Войти</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header
