import React from 'react';
import useAddToCart from '../../hooks/useAddToCart';
import CartNotification from '../Cart/CartNotification';
import HeartButton from '../cards/HeartButton'; // Adjust the path based on your file structure

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

    const handleWishlistClick = (event) => {
        event.stopPropagation(); 
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="upper-div">
                
                <img src={product.img_url} alt={product.product_name} className="card-img-top mx-3 product-image" />
            </div>
            <div className="card-body text-center">
                <h3 className="card-title product-name">{product.product_name}</h3>
                <p>{product.description}</p>
                <h2>${product.price}</h2>
                <div onClick={handleWishlistClick}> 
                    <HeartButton productId={product._id} className="wishlist-button" />
                </div>
                <button className="button" onClick={handleAddToCart}>
                    Add to cart
                    <div className="hoverEffect">
                        <div></div>
                    </div>
                </button>
                <p>{product.product_location}</p>
                <CartNotification show={showPopup} message="Product added to cart" />
            </div>
        </div>
    );
}

export default ProductCard;
