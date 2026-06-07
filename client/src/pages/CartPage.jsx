import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, PackageCheck } from 'lucide-react';
import axios from 'axios';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [activeOrders, setActiveOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (user) {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get('/api/orders/myorders', config);
          const approved = data.filter(o => o.status.includes('Approved'));
          setActiveOrders(approved);
        } catch (e) {}
      }
    };
    fetchMyOrders();
  }, [user]);

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="max-w-6xl mx-auto">
      {activeOrders.length > 0 && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <PackageCheck size={28} />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-lg">Great news! You have {activeOrders.length} approved order(s).</h3>
              <p className="text-green-700 text-sm">The admin has securely processed your payment and your goods are now out for delivery!</p>
            </div>
          </div>
          <button onClick={() => navigate('/profile')} className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-sm shadow transition">
            Track Orders
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <Link to="/products" className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-blue-800 transition">Return to Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cartItems.map(item => (
              <div key={item.product} className="flex items-center justify-between bg-white p-4 mb-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} loading="lazy" className="w-20 h-20 object-contain bg-white p-1 rounded" />
                  <div>
                    <Link to={`/products/${item.product}`} className="text-lg font-bold text-primary hover:underline">{item.name}</Link>
                    <div className="text-gray-500 font-semibold">KSh {item.price.toLocaleString('en-KE')}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-600 font-bold">Qty:</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.qty} 
                      onChange={(e) => {
                        if (e.target.value >= 1) {
                          addToCart({ ...item, qty: Number(e.target.value) });
                        }
                      }}
                      className="border border-gray-300 rounded px-2 py-1 w-16 text-center focus:ring-primary focus:border-primary font-bold"
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.product)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full title='Remove Item'">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-20">
              <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                <span>KSh {totalAmount.toLocaleString('en-KE')}</span>
              </div>
              <div className="flex justify-between mb-6 text-xl font-bold text-gray-900 border-t pt-4">
                <span>Total:</span>
                <span className="text-primary">KSh {totalAmount.toLocaleString('en-KE')}</span>
              </div>
              <button 
                onClick={checkoutHandler} 
                className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition uppercase tracking-wider"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
