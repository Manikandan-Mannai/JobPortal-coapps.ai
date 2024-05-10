import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';
import AppliedJobs from './AppliedJobs';

const SeekerProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    degree: '',
    college: '',
    gender: '',
    DOB: '',
    aboutMe: ''
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [appliedJobsData, setAppliedJobsData] = useState([]);
  const [noJobsFound, setNoJobsFound] = useState(false);

  const loggedUser = user._id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/profileDetails/${loggedUser}`, formData);
      console.log('User data saved successfully:', response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/profileDetails/?userId=${loggedUser}`)
      .then(response => {
        const userData = response.data;
        console.log('User data:', userData);
        setFormData(userData);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loggedUser]);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/appliedJobs?userId=${loggedUser}`)
      .then(response => {
        const result = response.data;
        if (result && result.length > 0) {
          setAppliedJobsData(result);
        } else {
          setNoJobsFound(true);
        }
      })
      .catch(error => {
        console.error('Error fetching applied jobs:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loggedUser]);

  const handleEditClick = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };

  return (
    <UserProfileContainer>
      <UserProfileHeader>User Profile</UserProfileHeader>
      <UserProfileInfo>
        <UserProfileField>Name: {user.name}</UserProfileField>
        <UserProfileField>Email: {user.email}</UserProfileField>
        <UserProfileField>Phone: {user.phone}</UserProfileField>
        <EditButton onClick={handleEditClick} />
      </UserProfileInfo>
      {editMode ? (
        <Form onSubmit={handleSubmit}>
          <FormInput type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" />
          <FormInput type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College" />
          <FormInput type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
          <FormInput type="text" name="DOB" value={formData.DOB} onChange={handleChange} placeholder="Date of Birth" />
          <FormTextarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} placeholder="About Me" />
          <SubmitButton type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</SubmitButton>
        </Form>
      ) : (
        <div>
          <UserProfileField>Degree: {formData.degree}</UserProfileField>
          <UserProfileField>College: {formData.college}</UserProfileField>
          <UserProfileField>Gender: {formData.gender}</UserProfileField>
          <UserProfileField>Date of Birth: {formData.DOB}</UserProfileField>
          <UserProfileField>About Me: {formData.aboutMe}</UserProfileField>
        </div>
      )}
      {noJobsFound ? (
        <NoJobsMessage>No applied jobs found for the user</NoJobsMessage>
      ) : (
        <AppliedJobs appliedJobsData={appliedJobsData} />
      )}
    </UserProfileContainer>
  );
};

export default SeekerProfile;


const UserProfileContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #F7FDFD;
  width: 100vw;
  min-height: 100vh;
  padding: 20px 100px;
`;

const UserProfileHeader = styled.h1`
  font-size: 24px;
`;

const UserProfileInfo = styled.div`
  margin-bottom: 20px;
`;

const UserProfileField = styled.p`
  margin-bottom: 5px;
`;

const EditButton = styled(FaPen)`
  cursor: pointer;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const FormInput = styled.input`
  margin-bottom: 10px;
`;

const FormTextarea = styled.textarea`
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const NoJobsMessage = styled.p`
  margin-top: 20px;
`;
