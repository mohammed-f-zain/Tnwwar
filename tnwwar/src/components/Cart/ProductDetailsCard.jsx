import React, { useState } from 'react';
import useAddToCart from './useAddToCart';
import useRemoveFromCart from './useRemoveFromCart';

function ProductDetailsCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useAddToCart();
    const { removeFromCart } = useRemoveFromCart();

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id);
            // Handle success
        } catch (error) {
            console.error('Failed to add item to cart:', error.message);
            // Handle error
        }
    };

    const handleRemoveFromCart = async () => {
        try {
            await removeFromCart(product._id);
            // Handle success
        } catch (error) {
            console.error('Failed to remove item from cart:', error.message);
            // Handle error
        }
    };

    return (
        <div className="product-card">
            <img src={product.img_url} alt={product.product_name} className="product-image" />
            <div className="product-details">
                <h3>{product.product_name}</h3>
                <p>Price: ${product.price}</p>
                {/* Render other details */}
                <div className="quantity-controls">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div className="action-buttons">
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleRemoveFromCart}>Remove from Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsCard;
