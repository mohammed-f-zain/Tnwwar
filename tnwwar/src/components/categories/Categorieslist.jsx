import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categorieslist() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/getCategory');
                const data = await response.json();
                // Add a static category for "All"
                const allCategory = { _id: 'all', category_name: 'All', category_img: 'https://cdn0.iconfinder.com/data/icons/category-of-words-and-phrases/128/All-512.png' };
                setCategories([allCategory, ...data]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories-container">
            <div className="categories-list">
                {categories.map(category => (
                    <Link to={`/category/${category.category_name}`} key={category._id} className="category-link">
                        <div className="category-card">
                            <img src={category.category_img} alt={category.category_name} className="category-img" />
                            <h2>{category.category_name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categorieslist;
