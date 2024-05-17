import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/cards/ProductCard';


function CategoryProducts() {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/allProducts`);
                const data = await response.json();

                if (categoryName === 'All') {
                    // If the category is 'All', display all products
                    setProducts(data);
                } else {
                    // Otherwise, filter products by category name
                    const filteredProducts = data.filter(product => product.product_category.category_name === categoryName);
                    setProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    return (
        <div className="container">
            <h1>{categoryName} Products</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"> {/* Adjust the number of columns */}
                {products.map(product => (
                    <div key={product._id} className="col mb-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryProducts;
