import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const JobUpload = () => {
    const [title, setTitle] = useState('');
    const [jobType, setJobType] = useState('Full time');
    const [salary, setSalary] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log("LogegdUserId", storedUserId);
        if (storedUserId) {
            setLoggedUserId(storedUserId);
        }
    }, []);


    const handleUploadJob = (e) => {
        e.preventDefault();
        setLoading(true);

        const formatData = {
            userId: loggedUserId,
            title,
            jobType,
            salary,
            vacancies,
            experience,
            location,
            description,
            responsibilities
        }
        if (loggedUserId) {
            axios.post('http://localhost:5000/jobUpload', formatData)
                .then(response => {
                    console.log(response.data)
                    setTitle('');
                    setJobType('Full time');
                    setSalary('');
                    setVacancies('');
                    setExperience('');
                    setLocation('');
                    setDescription('');
                    setResponsibilities('');
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    return (
        <Container>
            <FormContainer>
                <h2>Job Post</h2>
                <Form onSubmit={handleUploadJob}>
                    <Input type="text" placeholder='Job Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="Full time">Full time</option>
                        <option value="Part time">Part time</option>
                        <option value="Contract">Contract</option>
                        <option value="Intern">Intern</option>
                    </Select>
                    <Input type="number" placeholder='Salary' value={salary} onChange={(e) => setSalary(e.target.value)} />
                    <Input type="number" placeholder='No of Vacancies' value={vacancies} onChange={(e) => setVacancies(e.target.value)} />
                    <Input type="number" placeholder='Experience' value={experience} onChange={(e) => setExperience(e.target.value)} />
                    <Input type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                    <TextArea placeholder='Job Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <TextArea placeholder='Core Responsibilities' value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} />
                    <Button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Job'}</Button>
                </Form>
            </FormContainer>
        </Container>
    );
}

export default JobUpload;

const Container = styled.div`
width: 100vw;
min-height: 100vh;
padding: 20px 100px;
background-color: #F7FDFD;
`;

const FormContainer = styled.div`
    
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
