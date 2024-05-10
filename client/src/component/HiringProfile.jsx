import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import ListedJobs from './ListedJobs';
import Applicant from './Applicant';

const HiringProfile = ({ user }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyWebsite: '',
        employeeSize: '',
        companyType: '',
        companyLocation: '',
        companyFounded: '',
        companyDescription: ''
    });
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [jobList, setJobList] = useState([])
    const loggeduser = user._id;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSend = {
                ...formData,
                userId: loggeduser
            };

            let response;
            if (!formData.companyName) {
                response = await axios.post('http://localhost:5000/userDetails', dataToSend);
            } else {
                response = await axios.put(`http://localhost:5000/userDetails/${loggeduser}`, dataToSend);
            }

            console.log('Company data saved successfully:', response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving company data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/userDetails?userId=${loggeduser}`)
            .then(response => {
                const companyData = response.data[0];
                console.log(companyData);
                if (companyData) {
                    setFormData({
                        companyName: companyData.companyName,
                        companyWebsite: companyData.companyWebsite,
                        employeeSize: companyData.employeeSize,
                        companyType: companyData.companyType,
                        companyLocation: companyData.companyLocation,
                        companyFounded: companyData.companyFounded,
                        companyDescription: companyData.companyDescription
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching company details:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [loggeduser]);

    useEffect(() => {
        axios.get(`http://localhost:5000/jobList?userId=${loggeduser}`)
            .then(result => {
                console.log("jobList", result.data);
                setJobList(result.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleEditClick = () => {
        setEditMode(prevEditMode => !prevEditMode);
    };

    return (
        <div>
            <h1>Hiring Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <FaPen onClick={handleEditClick} style={{ cursor: 'pointer' }} />
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                    <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
                    <input type="text" name="employeeSize" value={formData.employeeSize} onChange={handleChange} />
                    <input type="text" name="companyType" value={formData.companyType} onChange={handleChange} />
                    <input type="text" name="companyLocation" value={formData.companyLocation} onChange={handleChange} />
                    <input type="text" name="companyFounded" value={formData.companyFounded} onChange={handleChange} />
                    <input type="text" name="companyDescription" value={formData.companyDescription} onChange={handleChange} />
                    <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                </form>
            ) : (
                <div>
                    <p>Company Name: {user.companyName}</p>
                    <p>Company Website: {formData.companyWebsite}</p>
                    <p>Employee Size: {formData.employeeSize}</p>
                    <p>Company Type: {formData.companyType}</p>
                    <p>Company Location: {formData.companyLocation}</p>
                    <p>Company Founded: {formData.companyFounded}</p>
                    <p>Company Description: {formData.companyDescription}</p>
                </div>
            )}
            {jobList && (
                <>
                    <ListedJobs jobList={jobList} />
                    {jobList.map(job => (
                        <Applicant key={job._id} applicants={job.applicants} />
                    ))}
                </>
            )}


        </div>
    );
};

export default HiringProfile;
