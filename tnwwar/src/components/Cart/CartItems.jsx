import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';

function CartItems() {
    const { authToken } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (!authToken) {
                    throw new Error('No auth token available');
                }

                const response = await fetch('http://localhost:8080/cart', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const data = await response.json();
                setCartItems(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [authToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Cart Items</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item._id}>
                        <h3>Product: {item.cart_product}</h3>
                        <p>Quantity: {item.quantity}</p>
                        {/* You can include more details here if needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CartItems;
