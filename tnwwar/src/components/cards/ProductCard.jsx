import React from 'react';

function ProductCard({ product, onAddToCart }) {
    const handleClick = () => {
        // Handle click to open card details
        // Example: history.push(`/productDetails/${product._id}`);
    };

    const handleAddToCart = (event) => {
        // Prevent the default behavior of the Link component
        event.preventDefault();
        // Stop the event from propagating to the parent elements
        event.stopPropagation();

        // Handle adding product to cart
        // Example: onAddToCart(product);
    };

    return (
        <div className="card p-3 product-card" onClick={handleClick}>
            <img src={product.img_url} alt={product.product_name} className="card-img-top mx-3 product-image" />
            <div className="card-body text-center">
                <h6 className="card-title product-name">{product.product_name}</h6>
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;
