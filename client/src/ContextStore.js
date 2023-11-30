
import React, { useState, useEffect, useMemo } from 'react';

export const Context = React.createContext();

export const ContextStore = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [authToken, setAuthToken] = useState(null);

    // Fetch user data
    useEffect(() => {
        fetch(`/auth/getUser`, {
            credentials: 'include', // if your API requires credentials such as cookies
        }).then(res => res.json())
          .then(data => {
              setUserData(data.user);
          })
          .catch(err => console.error('Error fetching user data:', err));
    }, []);

    // Fetch cart data
//    useEffect(() => {
//        fetch(`/api/getCart`, {
//            method: 'GET',
//            headers: {
//                'Content-Type': 'application/json',
//                // If your API requires an authorization token, add it in the headers
//                // 'Authorization': `Bearer ${token}`,
//            },
//            credentials: 'include', // if your API requires credentials such as cookies
//        })
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            return response.json();
//        })
//        .then(data => {
//            setCartData(data.cartItems); // Assuming the response body has a cartItems field
//        })
//        .catch(error => {
//            console.error('Error fetching cart data:', error);
//        });
//    }, [userData]); // This effect depends on userData, fetch cart after user data is set

    const addToCart = (newItem) => {
            setCartData(currentCartData => {
                const existingItem = currentCartData.find(item => item.productId === newItem.productId);
                if (existingItem) {
                    return currentCartData.map(item =>
                        item.productId === newItem.productId
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                } else {
                    return [...currentCartData, newItem];
                }
            });
        };

        const removeFromCart = (productId) => {
            setCartData(currentCartData =>
                currentCartData.filter(item => item.productId !== productId)
            );
        };

    const providerValue = useMemo(() => ({
        userData,
        setUserData,
        cartData,
        setCartData,
        addToCart,
        removeFromCart,
        // Add functions to modify cartData here
    }), [userData, cartData]);

    return (
        <Context.Provider value={providerValue}>
            {children}
        </Context.Provider>
    );
}

export default ContextStore;









//import React, { useState, useEffect, useMemo } from 'react';
//// import { useCookies } from 'react-cookie'
//export const Context = React.createContext();
//
//export const ContextStore = ({ children }) => {
//    let initialValue = null;
//    // const [cookies, setCookie, removeCookie] = useCookies(['USER_SESSION']);
//    const [userData, setUserData] = useState(initialValue)
//
//    useEffect(() => {
//        //if (cookies.USER_SESSION) {
//            fetch(`/auth/getUser`).then(res => res.json())
//                .then(res => {
//                    return setUserData(res.user)
//                })
//        //}
//    }, [])
//
//    // console.log(userData)
//    const providerValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData])
//
//    return (
//        <Context.Provider value={providerValue}>
//            {children}
//        </Context.Provider>
//    )
//}