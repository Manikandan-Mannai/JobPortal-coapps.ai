import React from 'react';
import styled from 'styled-components';

const ListedJobs = ({ jobList }) => {
    return (
        <Container>
            {jobList.map(job => (
                <JobCard key={job._id}>
                    <h3>{job.title}</h3>
                    <p><strong>Job Type:</strong> {job.jobType}</p>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Vacancies:</strong> {job.vacancies}</p>
                    <p><strong>Experience:</strong> {job.experience}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Description:</strong> {job.description}</p>
                    <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
                    <p><strong>Applicants:</strong> {job.applicants.length}</p> {/* Display applicants count */}
                </JobCard>
            ))}
        </Container>
    );
}

export default ListedJobs;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const JobCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  h3 {
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
  }
`;
