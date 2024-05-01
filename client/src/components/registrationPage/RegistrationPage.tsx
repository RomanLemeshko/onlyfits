import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { register } from '../../store/auth/authSlice'; 

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await dispatch(register({ username, email, password })).unwrap();
      navigate('/login'); 
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationPage;
