import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [tab, setTab] = useState('employee');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/register", {
            name,
            email,
            password,
            phone,
            ...(tab === 'company' && { companyName })
        })
            .then(result => {
                console.log(result);
                navigate('/login');
            })

            .catch(err => console.log(err))

        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
    };

    return (
        <Container>
            <TabWrapper>
                <TabButton active={tab === 'employee' ? 'true' : 'false'} onClick={() => setTab('employee')}>Employee</TabButton>
                <TabButton active={tab === 'company' ? 'true' : 'false'} onClick={() => setTab('company')}>Company</TabButton>
            </TabWrapper>
            <Form onSubmit={handleSubmit}>
                {tab === 'employee' ? (
                    <>
                        <h2>Employee Registration</h2>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h2>Company Registration</h2>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </>
                )}
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default Register;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TabWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const TabButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: ${(props) => (props.$active === 'true' ? '#007bff' : '#ccc')};
    color: ${(props) => (props.$active === 'true' ? '#fff' : '#000')};
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Form = styled.form`
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
