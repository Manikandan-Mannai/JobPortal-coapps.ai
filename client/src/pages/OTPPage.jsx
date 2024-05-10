import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OTPPage = () => {
  const [otp, setOTP] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  // const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP();
  }, []);

  useEffect(() => {
    console.log("Generated OTP:", generatedOTP);
  }, [generatedOTP]);

  const generateOTP = () => {
    if (!generatedOTP) {
      const randomOTP = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOTP(randomOTP.toString());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOTP) {
      navigate('/');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Container>
      <Title>OTP Page</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default OTPPage;

const Container = styled.div`
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-bottom: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;