import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FindJobs = () => {
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(result => {
                setJobData(result.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError('Error fetching data.');
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

        useEffect(() => {
            const storedAppliedJobs = localStorage.getItem('appliedJobs');
            if (storedAppliedJobs) {
                setAppliedJobs(JSON.parse(storedAppliedJobs));
            }
        }, []);

    const handleApply = (jobId) => {
        if (!userId) {
            console.error('User ID not found');
            return;
        }
        axios.post(`http://localhost:5000/apply/${jobId}`, { userId })
            .then(response => {
                console.log(response.data.msg);
                console.log("Applied");
                setAppliedJobs([...appliedJobs, jobId]);
                localStorage.setItem('appliedJobs', JSON.stringify([...appliedJobs, jobId])); // Update local storage
            })
            .catch(error => {
                console.error('Error applying for job:', error);
            });
    };

    const isJobApplied = (jobId) => {
        return appliedJobs.includes(jobId);
    };

    return (
        <Container>
            <h1>Find Your Dream Job with Ease</h1>
            <JobContainer>
                {loading ? (
                    <LoadingMessage>Loading...</LoadingMessage>
                ) : error ? (
                    <ErrorMessage>{error}</ErrorMessage>
                ) : (
                    jobData.map(data => (
                        <Job key={data._id}>
                            <Title>Title: {data.title}</Title>
                            <JobType>JobType: {data.jobType}</JobType>
                            <Salary>Salary: {data.salary}</Salary>
                            {isJobApplied(data._id) ? (
                                <AppliedButton>Applied</AppliedButton>
                            ) : (
                                <ApplyButton onClick={() => handleApply(data._id)}>Apply</ApplyButton>
                            )}
                        </Job>
                    ))
                )}
            </JobContainer>
        </Container>
    );
};

export default FindJobs;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding: 20px 100px;
    background-color: #F7FDFD;
    
`;

const JobContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
`;

const Job = styled.div`
    width: 16rem;
    height: 16rem;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #333;
`;

const JobType = styled.p`
    color: #666;
`;

const Salary = styled.p`
    color: #666;
`;

const ApplyButton = styled.button`
    background-color: #2577fd;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1e5ab4;
    }
`;

const AppliedButton = styled.button`
    background-color: #ccc;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: not-allowed;
`;

const LoadingMessage = styled.p`
    color: #333;
`;

const ErrorMessage = styled.p`
    color: #ff0000;
`;
