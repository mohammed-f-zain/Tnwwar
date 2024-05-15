// ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from "../components/header/header";
import RightAside from '../components/Right-aside/RightAside';
import ProductCarousel from '../components/Home/ProductCarousel';
import useAddToCart from '../hooks/useAddToCart';
import CartNotification from '../components/Cart/CartNotification'; 

function ProductDetails() {
    const { id } = useParams();
    const { activeTab, handleTabChange } = useTabNavigation();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const { addToCart, showPopup } = useAddToCart();

    useEffect(() => {
        axios.get(`http://localhost:8080/productDetails/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:8080/suggestedProducts')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching suggested products:', error);
            });
    }, []);

    const handleAddToCart = async () => {
        try {
            if (product) {
                await addToCart(product._id);
                console.log('Product added to cart');
            }
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
                </div>
                <div className='col-sm-8'>
                    <Header />
                    <div className='products_details_container'>
                        <h2>Product Details</h2>
                        <div className='products_details_content'>
                            <div className='product_image_container'>
                                <img src={product.img_url} alt={product.product_name} />
                            </div>
                            <div className='product_details_container'>
                                <p> <h3>{product.product_name}</h3></p>
                                <h5>Description</h5>
                                <p> <span>{product.description}</span></p>
                                <h5>Price</h5>
                                <p> <span>${product.price}</span></p>
                                <h5>Category</h5>
                                <p> <span>{product.product_category.category_name}</span></p>
                                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                            </div>
                        </div>
                        <div className='container mt-5'>
                            <h2>Suggested Products</h2>
                            <div>
                                <ProductCarousel products={products} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-2'>
                    <RightAside />
                </div>
            </div>
            {/* Render the CartNotification component */}
            <CartNotification show={showPopup} message="Product added to cart" />
        </div>
    );
}

export default ProductDetails;
