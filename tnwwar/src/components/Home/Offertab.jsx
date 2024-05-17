import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAddToCart from '../../hooks/useAddToCart';
import CartNotification from "../Cart/CartNotification";
import { useAuth } from '../../context/AuthContext';
import HeartButton from '../cards/HeartButton'; // Make sure to adjust the path based on your file structure

function Offertab() {
    const [allProducts, setAllProducts] = useState([]);
    const [randomProduct, setRandomProduct] = useState(null);
    const { addToCart, showPopup } = useAddToCart();
    const { authToken } = useAuth(); // Get the authentication token from the AuthContext

    useEffect(() => {
        axios.get('http://localhost:8080/allProducts')
            .then(response => {
                setAllProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching all products:', error);
            });
    }, []);

    useEffect(() => {
        if (allProducts.length > 0) {
            const randomIndex = Math.floor(Math.random() * allProducts.length);
            setRandomProduct(allProducts[randomIndex]);
        }
    }, [allProducts]);

    const handleAddToCart = async () => {
        try {
            if (randomProduct) {
                await addToCart(randomProduct._id);
                console.log('Product added to cart');
            }
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    return (
        <div>
            {randomProduct ? (
                <div className="Offer-card">
                    <img
                        src={randomProduct.img_url}
                        alt={randomProduct.product_name}

                    />
                    <div className="offer-details">
                        <h2 className="offer_product_name">{randomProduct.product_name}</h2>
                        <p className="offer_product_description">{randomProduct.description}</p>
                        <p className="offer_product_price">Price: ${randomProduct.price}</p>
                        <div className="offer-right-details">
                            <p className="offer_product_category">{randomProduct.product_category.category_name}</p>
                            <p className="offer_product_location">{randomProduct.product_location}</p>
                        </div>
                        <div className="d-flex">
                        <button className="button" onClick={handleAddToCart}>
                            Add to cart
                            <div className="hoverEffect">
                                <div></div>
                            </div>
                        </button>
                        <HeartButton productId={randomProduct._id} />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <CartNotification show={showPopup} message="Product added to cart" />
        </div>
    );
}

export default Offertab;
