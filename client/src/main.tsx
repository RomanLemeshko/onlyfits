import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { setUser, refreshAccessToken } from './store/auth/authSlice';
import RouterComponent from './router';
import { useAppDispatch } from './store/hooks';
import './index.css';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userJson = localStorage.getItem('user');

      if (accessToken && userJson) {
        try {
          const user = JSON.parse(userJson);
          dispatch(setUser({ accessToken, user }));
          await dispatch(refreshAccessToken()).unwrap()
        } catch (e) {
          console.error('Error parsing user data:', e);
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [dispatch]);

  if (loading) {
    return <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f0f0" }}></div>;
  }
  

  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
