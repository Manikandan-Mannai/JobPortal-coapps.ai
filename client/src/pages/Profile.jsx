import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SeekerProfile from '../component/SeekerProfile';
import HiringProfile from '../component/HiringProfile';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accountType, setAccountType] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log("storedUserId", storedUserId);
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            axios.get(`http://localhost:5000/user/${userId}`)
                .then(result => {
                    console.log("profile", result);
                    setUserId(result.data._id);
                    setAccountType(result.data.accountType);
                    setUser(result.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [userId]); 

    return (
        <div>
            {loading ? (
                <p>Loading user details...</p>
            ) : (
                <>
                    {
                        accountType && accountType === 'seeker' ? (
                            <SeekerProfile user={user} />
                        ) : (
                            <HiringProfile user={user} userId={userId} />
                        )
                    }
                </>
            )}
        </div>
    );
};

export default Profile;
