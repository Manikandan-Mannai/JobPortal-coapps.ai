import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Applicant = ({ applicants }) => {
    const [applicantDetails, setApplicantDetails] = useState([]);

    useEffect(() => {
        const fetchApplicantDetails = () => {
            const requests = applicants.map(applicantId =>
                axios.get(`http://localhost:5000/applicant?userId=${applicantId}`)
            );
            Promise.all(requests)
                .then(responses => {
                    const userDetails = responses.map(response => response.data);
                    setApplicantDetails(userDetails);
                })
                .catch(error => {
                    console.error('Error fetching applicant details:', error);
                });
        };

        fetchApplicantDetails();
    }, [applicants]);

    return (
        <div>
            <h2>Applicants</h2>
            <ul>
                {applicantDetails.map((applicant, index) => (
                    <li key={index}>
                        {applicant ? (
                            <>
                                <p>Name: {applicant.name || 'N/A'}</p>
                                <p>Email: {applicant.email || 'N/A'}</p>
                                {/* Add other details as needed */}
                            </>
                        ) : (
                            <p>Details not available</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Applicant;
