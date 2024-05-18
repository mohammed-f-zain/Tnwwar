import React, { useState, useEffect } from 'react';
import DeleteConfirmationPopup from '../components/dashboard/DeleteConfirmationPopup';
import logo from "../assets/logos/mainLogo.svg";
import AddProductForm from '../components/dashboard/AddProductForm'; // Import the AddProductForm component
import Footer from '../components/Footer/Footer';

function SellerDashboard() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false); // State to control the visibility of the add product form

    useEffect(() => {
        // Fetch seller products and setProducts state
        fetchSellerProducts();
    }, []);

    const fetchSellerProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/getSellerProducts', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch seller products');
            }
        } catch (error) {
            console.error('An error occurred while fetching seller products:', error);
        }
    };

    const handleDeleteConfirmation = (productId) => {
        setSelectedProduct(productId);
        setIsDeleteConfirmationOpen(true);
    };

    const handleDeleteCancel = () => {
        setSelectedProduct(null);
        setIsDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:8080/deletedProducts/${selectedProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.ok) {
                setIsDeleteConfirmationOpen(false);
                fetchSellerProducts();
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('An error occurred while deleting product:', error);
        }
    };

    const handleAddProductFormOpen = () => {
        setIsAddProductFormOpen(true);
    };

    const handleAddProductFormClose = () => {
        setIsAddProductFormOpen(false);
    };

    return (
        <div className='container-fluid backg'>
            <div className='d-flex dash-header'>
                <img src={logo} alt="Logo" />
                <h4>Here You can Control All Your Products</h4>
            </div>
            <div className='add-button'>
                <button className="button" onClick={handleAddProductFormOpen}>
                    Add New Product +
                    <div className="hoverEffect">
                        <div></div>
                    </div>
                </button>
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Shop Name</th>
                        <th>Rating</th>
                        <th>Category</th>
                        <th>Product Count</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td><img className='product-image' src={product.img_url} alt="Product" /></td>
                            <td>{product.product_name}</td>
                            <td>{product.shop_name}</td>
                            <td>{product.rating}</td>
                            <td>{product.product_category.category_name}</td>
                            <td>{product.product_count}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className='delete-dashboard' onClick={() => handleDeleteConfirmation(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteConfirmationPopup
                isOpen={isDeleteConfirmationOpen}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
            {isAddProductFormOpen && (
                <AddProductForm onClose={handleAddProductFormClose} />
            )}
        </div>
    );
}

export default SellerDashboard;
