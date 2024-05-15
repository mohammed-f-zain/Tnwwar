// Offertab.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAddToCart from '../../hooks/useAddToCart';
import CartNotification from "../Cart/CartNotification"
function Offertab() {
    const [allProducts, setAllProducts] = useState([]);
    const [randomProduct, setRandomProduct] = useState(null);
    const { addToCart, showPopup } = useAddToCart();

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
                    <img src={randomProduct.img_url} alt={randomProduct.product_name} style={{ width: '200px' }} />
                    <div>
                        <h2 className='product_name'>{randomProduct.product_name}</h2>
                        <p className='product_description'>{randomProduct.description}</p>
                        <p className='product_price'>Price: ${randomProduct.price}</p>
                        <button onClick={handleAddToCart} className='offer_addtoCart'>Add to Cart</button>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {/* Render the CartNotification component */}
            <CartNotification show={showPopup} message="Product added to cart" />
        </div>
    );
}

export default Offertab;
