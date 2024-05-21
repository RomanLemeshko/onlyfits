import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks'; 
import { login } from '../../store/auth/authSlice';
import { Input, Button, Form, Typography, Layout } from 'antd';
import './LoginPage.css';

const { Title } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#000000', fontFamily: 'Bebas Neue, sans-serif' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Bebas Neue, sans-serif' }}>
        <div className="login-container">
          <div className="logo login-logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/onlyfits_logotype.png?alt=media&token=3e929633-b844-48cd-9158-1a8a2581c6de" alt="onlyfits_logo" />
          </div>

          <Title level={1} className="title-gradient">SIGN IN</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            style={{ width: '100%', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button className="custom-login-button" htmlType="submit">
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          <div className="additional-links">
            <Link to="/register" className="link">Don't have OnlyFits account? Sign up</Link>
            <Link to="/" className="link">Go back to the main page</Link>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
