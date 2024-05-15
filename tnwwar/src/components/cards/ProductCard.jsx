// ProductCard.jsx
import React from 'react';
import useAddToCart from '../../hooks/useAddToCart';
import CartNotification from '../Cart/CartNotification'; 


function ProductCard({ product }) {
    const { addToCart, showPopup } = useAddToCart();

    const handleClick = () => {
        // Handle click to open card details
        // Example: history.push(`/productDetails/${product._id}`);
    };

    const handleAddToCart = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await addToCart(product._id);
            console.log('Product added to cart');
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    return (
        <div className="card p-3 product-card" onClick={handleClick}>
            <img src={product.img_url} alt={product.product_name} className="card-img-top mx-3 product-image" />
            <div className="card-body text-center">
                <h6 className="card-title product-name">{product.product_name}</h6>
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                <CartNotification show={showPopup} message="Product added to cart" />
            </div>
        </div>
    );
}

export default ProductCard;
