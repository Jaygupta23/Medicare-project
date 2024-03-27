
import { createContext, useContext, useEffect, useState } from 'react';
import { createStoreHook } from 'react-redux';

const CartContext = createContext()
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  const [toggle, setToggle] =useState(false)
  const [count, setCount] =useState(1)


    useEffect(() => {
        let exsistingCartItem = localStorage.getItem("cart");
        if (exsistingCartItem) setCart(JSON.parse(exsistingCartItem));
    }, []);

    return (
        <CartContext.Provider value={{cart, setCart, setToggle, toggle, count, setCount}}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook 
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };