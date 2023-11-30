// client/src/components/Details/ProductDetail.js
import React, { useState, useContext } from 'react';

import { Context } from '../../../ContextStore'; // Adjust the import path as needed
import './ProductDetail.css';
import axios  from 'axios';
//const axios = require('axios');
import { cartProduct } from '../../../services/productData'



const ProductDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { userData, addToCart } = useContext(Context);
    //const { addToCart } = cartProduct;

    const handleQuantityChange = (event) => {
        setQuantity(Math.max(1, parseInt(event.target.value))); // Ensure the quantity is at least 1
    };

//    const handleAddToCart = () => {
//        axios.post('${baseUrl}/cart/add', { productId: product._id, quantity: parseInt(quantity) })
//            .then(response => {
//                addToCart({ productId: product._id, quantity: parseInt(quantity) });
//                alert('Added to cart!');
//            })
//            .catch(error => {
//                console.error('Error adding to cart:', error);
//                alert('Error adding to cart.');
//            });
//    };

    const handleAddToCart = () => {
        console.log("USERDATA");
        console.log(userData);
        const token = userData.token;
        axios.post('http://54.153.59.75:4000/cart/add',
            { productId: product._id, quantity: parseInt(quantity) },
            {withCredentials: true})
//                       { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                // If you need to update the cart in your context or state, do it here
                // addToCart({ productId: product._id, quantity: parseInt(quantity) });
                alert('Added to cart!');
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                // You can make this more user-friendly, perhaps displaying the message in the UI
                alert('Error adding to cart.');
            });
    };


    return (
        <div className="product-detail">
            <div className="add-to-cart">
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock} // Assuming the product has a 'stock' attribute
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            {/* Additional product details */}
        </div>
    );
};

export default ProductDetail;
