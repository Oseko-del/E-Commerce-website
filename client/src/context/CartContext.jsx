import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  // Load from local storage initially
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Sync to database if user is logged in
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get('/api/cart', config);
          if (data && data.items) setCartItems(data.items);
        } catch (error) {
          console.error("Error fetching cart", error);
        }
      };
      fetchCart();
    }
  }, [user]);

  const addToCart = async (product) => {
    const existingObj = cartItems.find(x => x.product === product.product);
    let updatedCart;
    if (existingObj) {
      updatedCart = cartItems.map(x => x.product === existingObj.product ? product : x);
    } else {
      updatedCart = [...cartItems, product];
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    if (user) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.post('/api/cart', { items: updatedCart }, config);
      } catch (err) {
        console.error("Error syncing cart data", err);
      }
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter(x => x.product !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    if (user) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.post('/api/cart', { items: updatedCart }, config);
      } catch (err) {
        console.error("Error syncing cart data", err);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    if (user) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.post('/api/cart', { items: [] }, config);
      } catch (err) {
        console.error("Error syncing cart data", err);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
