import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

function Header() {
    const { authToken, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="header-container">
            <div className="search-box">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="login-button">
                {authToken ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
