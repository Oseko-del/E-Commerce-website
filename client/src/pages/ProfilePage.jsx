import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">My Profile</h1>
      <div className="bg-white p-8 rounded-xl shadow border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-primary">My Order History</h2>
        {loading ? (
          <div className="text-gray-500 font-semibold">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500 bg-gray-50 p-6 rounded-lg text-center">
             You have no past orders. <Link to="/products" className="text-primary hover:underline font-bold">Start Shopping!</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                 <div className="flex justify-between items-center font-bold text-gray-800 mb-4 border-b pb-2">
                   <span className="text-sm">Order ID: <span className="text-xs text-gray-500 block md:inline">{order._id}</span></span>
                   <span className="text-primary text-xl">KSh {order.total.toLocaleString('en-KE')}</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <div className="text-sm text-gray-600"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                   <div className="text-sm text-gray-600"><strong>Status:</strong> <span className="text-green-600 font-bold uppercase">{order.status}</span></div>
                 </div>
                 <div className="bg-white p-4 rounded border border-gray-100">
                   <h4 className="font-semibold text-gray-700 mb-2 text-sm border-b pb-1">Items Purchased:</h4>
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between py-2 text-sm text-gray-700">
                       <span className="truncate w-1/2 flex items-center"><img src={item.image} className="w-8 h-8 rounded mr-3 object-contain bg-white"/> {item.name}</span>
                       <span>Qty: {item.qty}</span>
                     </div>
                   ))}
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
