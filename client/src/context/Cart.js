
import { createContext, useContext, useEffect, useState } from 'react';
import { createStoreHook } from 'react-redux';

const CartContext = createContext()
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let exsistingCartItem = localStorage.getItem("cart");
        if (exsistingCartItem) setCart(JSON.parse(exsistingCartItem));
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook 
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };