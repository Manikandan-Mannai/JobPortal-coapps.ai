import React, { useState } from 'react';
import styled from 'styled-components';
import OTPPage from './OTPPage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOTPPage, setShowOTPPage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                console.log(result);
                localStorage.setItem('accountType', result.data.accountType);
                localStorage.setItem('userId', result.data.userId);
                Cookies.set('userId', result.data.userId);
                if (result.data.status === 'authorized') {
                    setShowOTPPage(true);
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <Container>
            {!showOTPPage ? (
                <LoginForm>
                    <h2>Login</h2>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Login</Button>
                    <Link to='/register'>Register</Link>
                </LoginForm>
            ) : (
                <OTPPage email={email} />
            )}
        </Container>
    );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
`;

const Input = styled.input`
  margin: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
