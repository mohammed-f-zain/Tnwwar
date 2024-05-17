import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from '../components/header/header';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import HeartButton from '../components/cards/HeartButton'; // Adjust the path based on your file structure

function SavedPage() {
  const { activeTab, handleTabChange } = useTabNavigation();
  const { authToken } = useAuth(); // Get the authentication token from the AuthContext
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/wishlist', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setWishlistItems(response.data); // Assuming the response data is an array of wishlist items
      setError(null);
    } catch (error) {
      setError('Error fetching wishlist');
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [authToken]); // Fetch wishlist when authToken changes

  const handleWishlistChange = () => {
    fetchWishlist(); // Fetch wishlist again after an item is added or removed
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
        <div className="col-sm-10">
          <Header />
          <div className="content">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div>
                <h2>Wishlist</h2>
                <div className="wishlist-items">
                  {wishlistItems.map(item => (
                    <div key={item._id} className="wishlist-item">
                      <div className="wishlist-item-header">
                        <HeartButton productId={item._id} onWishlistChange={handleWishlistChange} className="wishlist-button" /> {/* Add HeartButton */}
                        <img src={item.img_url} alt={item.product_name} className="wishlist-item-image" />
                      </div>
                      <p>{item.product_name}</p>
                      <p>${item.price}</p>
                      {/* Add any other details you want to display */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedPage;
