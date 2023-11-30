import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserCart } from '../../../services/userData';

import './Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserCart()
            .then(res => {
                console.log("Assuming res contains the cart items, adjust according to your API response");
                console.log(res);
                setCartItems(res?.cart?.items || []);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <h1 className="heading">Cart</h1>
                    {cartItems.length > 0 ? (
                        <Row>
                            {cartItems.map(item => (
                                <Col xs={12} md={6} lg={4} key={item.product._id}>
                                    <ProductCard params={item.product} />
                                    <p>Quantity: {item.quantity}</p>
                                    {/* You might want to show quantity and other info */}
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="nothing-to-show">Nothing to show in cart</p>
                    )}
                </>
            ) : (
                <Spinner animation="border" />
            )}
        </>
    );
}

export default Cart;
