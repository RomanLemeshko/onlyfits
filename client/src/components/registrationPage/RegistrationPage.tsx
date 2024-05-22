import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { register } from '../../store/auth/authSlice'; 
import { Input, Button, Form, Typography, Layout } from 'antd';
import './RegistrationPage.css';

const { Title } = Typography;
const { Content } = Layout;

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await dispatch(register({ username, email, password })).unwrap();
      navigate('/login'); 
    } catch (err) {
      const errorMessage = (err as Error).message;
      if (errorMessage.includes('Email already used')) {
        setError('User with this email already exists');
      } else {
        setError('Failed to register');
      }
      console.error('Failed to register:', err);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#000000', fontFamily: 'Bebas Neue, sans-serif' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Bebas Neue, sans-serif' }}>
        <div className="registration-container">
          <div className="logo registration-logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/onlyfits_logotype.png?alt=media&token=3e929633-b844-48cd-9158-1a8a2581c6de" alt="onlyfits_logo" />
          </div>
  
          <Title level={1} className="title-gradient">SIGN UP</Title>
          {error && <div className="error-message">{error}</div>}
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={handleRegister}
            style={{ width: '100%', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Item>
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
              <Button className="custom-register-button" htmlType="submit">
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
          <div className="additional-links">
            <Link to="/login" className="link">Already an OnlyFits? Sign in</Link>
            <Link to="/" className="link">Go back to the main page</Link>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default RegistrationPage;
