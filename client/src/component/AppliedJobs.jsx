import React from 'react';
import styled from 'styled-components';

const JobCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const JobTitle = styled.h3`
  margin-bottom: 10px;
`;

const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AppliedJobs = ({ appliedJobsData }) => {
  return (
    <div>
      <h2>Applied Jobs</h2>
      {appliedJobsData.map(job => (
        <JobCard key={job._id}>
          <JobTitle>{job.title}</JobTitle>
          <CompanyInfo>
            <div>
              <strong>Company Name:</strong> {job.companyName}
            </div>
            <div>
              <strong>JobType:</strong> {job.jobType}
            </div>
            <div>
              <strong>Salary:</strong> {job.salary}
            </div>
            <div>
              <strong>vacancies:</strong> {job.vacancies}
            </div>
            <div>
              <strong>Location:</strong> {job.location}
            </div>
          </CompanyInfo>
          <p>Description: {job.description}</p>
        </JobCard>
      ))}
    </div>
  );
};

export default AppliedJobs;
