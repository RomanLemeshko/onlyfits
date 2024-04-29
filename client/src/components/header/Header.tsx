import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

type User = {
  id: number;
  name: string;
};
const Header = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'Sergei',
  });

  return (
    <div className='main-page-container'>
      <>
        {user ? (
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
              <h5>User: {user.name}</h5>
            </div>
          </>
        ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/registry">Зарегистрирваться</Link>
            </li>
            <li>
              <Link to="/login">Воити</Link>
            </li>
          </ul>
        )}
      </>
    </div>
  );
};

export default Header;
