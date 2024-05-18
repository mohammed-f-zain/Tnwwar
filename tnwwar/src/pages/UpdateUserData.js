import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const cities = [
    "Amman", "Zarqa", "Irbid", "Aqaba", "Mafraq",
    "Jerash", "Madaba", "Karak", "Tafileh", "Ma'an",
    "Ajloun", "Balqa"
];

function UpdateUserData() {
    const { id } = useParams();
    const { authToken } = useAuth();
    const [userData, setUserData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_location: '',
        phone_number: ''
    });
    const [isEditing, setIsEditing] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profilePage`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [authToken, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEditClick = (field) => {
        setIsEditing({ ...isEditing, [field]: !isEditing[field] });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_name', userData.user_name);
        formData.append('user_email', userData.user_email);
        formData.append('password', userData.user_password);
        formData.append('user_location', userData.user_location);
        formData.append('phone_number', userData.phone_number);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            const response = await fetch(`http://localhost:8080/updateUser`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                navigate('/profile');
            } else {
                console.error('Error updating user data');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className='backg d-flex'>
            <div className="update-user-container ">
                <h2>Update Profile Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <div className="editable-field">
                            {isEditing.user_name ? (
                                <input
                                    type="text"
                                    name="user_name"
                                    value={userData.user_name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{userData.user_name}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('user_name')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <div className="editable-field">
                            {isEditing.user_email ? (
                                <input
                                    type="email"
                                    name="user_email"
                                    value={userData.user_email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{userData.user_email}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('user_email')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="editable-field">
                            {isEditing.user_password ? (
                                <input
                                    type="password"
                                    name="user_password"
                                    value={userData.user_password}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>**********</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('user_password')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <div className="editable-field">
                            {isEditing.phone_number ? (
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={userData.phone_number}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{userData.phone_number}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('phone_number')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <div className="editable-field">
                            {isEditing.user_location ? (
                                <select
                                    name="user_location"
                                    value={userData.user_location}
                                    onChange={handleInputChange}
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span>{userData.user_location}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('user_location')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Profile Image</label>
                        <input type="file" name="image" onChange={handleFileChange} />
                    </div>

                    <button className='update-user-data-btn' type="submit">Update</button>
                </form>
            </div>
      </div>
    );
}

export default UpdateUserData;
