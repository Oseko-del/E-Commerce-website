import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Product Form State
  const [formData, setFormData] = useState({ name: '', price: '', image: '', description: '', category: 'Electronics' });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [ordersRes, productsRes] = await Promise.all([
        axios.get('/api/orders', config),
        axios.get('/api/products')
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData, config);
        toast.success('Product updated');
      } else {
        await axios.post('/api/products', formData, config);
        toast.success('Product created');
      }
      setFormData({ name: '', price: '', image: '', description: '', category: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      toast.error('Error saving product');
    }
    setIsSubmitting(false);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploadingImage(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('/api/upload', bodyFormData, config);
      setFormData(prev => ({ ...prev, image: data }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image upload failed');
    }
    setUploadingImage(false);
  };

  const updateOrderStatus = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${id}/deliver`, {}, config);
      toast.success('Order marked as Approved!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const downloadPDF = async () => {
    try {
      const unreportedOrders = orders.filter(o => !o.isReported);
      if (unreportedOrders.length === 0) {
        toast.error('No new unreported orders exist!');
        return;
      }

      const doc = new jsPDF();
      doc.text("Alpha Personnel Care - Daily Unreported Orders", 14, 15);
      
      const tableColumn = ["Date/Time", "Order No.", "Customer", "Items (Name x Qty)", "Total Paid"];
      const tableRows = [];
      
      unreportedOrders.forEach(order => {
        const itemsStr = order.items.map(i => `${i.name} (x${i.qty})`).join('\n');
        const dateTime = new Date(order.createdAt).toLocaleString();
        
        const orderData = [
          dateTime,
          order._id.substring(18),
          order.user?.name || 'Unknown',
          itemsStr,
          `KSh ${Number(order.total).toLocaleString('en-KE')}`
        ];
        tableRows.push(orderData);
      });
      
      autoTable(doc, { 
        head: [tableColumn], 
        body: tableRows, 
        startY: 20,
        styles: { cellPadding: 2, fontSize: 9 },
        columnStyles: { 3: { cellWidth: 70 } } // Give items column extra width
      });
      
      doc.save(`Daily_Orders_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      
      // Update DB to mark as reported
      const orderIds = unreportedOrders.map(o => o._id);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put('/api/orders/mark-reported', { orderIds }, config);
      
      toast.success(`Successfully exported ${unreportedOrders.length} orders.`);
      fetchData(); // Refresh UI to trigger isReported state
    } catch (err) {
      console.error(err);
      toast.error('Failed to export PDF');
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        toast.success('Product deleted');
        fetchData();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name, price: product.price, image: product.image,
      description: product.description, category: product.category
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary border-b pb-4">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Manage Products Segment */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
           <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Product</h2>
           <form onSubmit={handleProductSubmit} className="space-y-4">
             <input type="text" placeholder="Name" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
             <input type="number" placeholder="Price" className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
             
             <div className="border p-4 rounded bg-white my-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                <input type="text" placeholder="Or enter Image URL" className="w-full border p-2 rounded mb-2 text-sm" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
                <div className="flex items-center space-x-4">
                  <input type="file" onChange={uploadFileHandler} className="border border-gray-300 p-1 w-full rounded text-sm bg-gray-50" />
                  {uploadingImage && <Loader2 className="animate-spin text-primary flex-shrink-0" size={24}/>}
                </div>
             </div>
             
             <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
                <option value="Electronics">Electronics</option>
                <option value="Fashion & Clothing">Fashion & Clothing</option>
                <option value="Shoes & Footwear">Shoes & Footwear</option>
                <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Kitchen & Appliances">Kitchen & Appliances</option>
                <option value="Supermarket / Groceries">Supermarket / Groceries</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Automotive Parts & Accessories">Automotive Parts & Accessories</option>
             </select>
             
             <textarea placeholder="Description" className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
             <button type="submit" disabled={isSubmitting} className={`text-white font-bold py-2 px-4 rounded w-full flex justify-center items-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-800'}`}>
               {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : (editingId ? 'Update Product' : 'Add Product')}
             </button>
             {editingId && (
               <button type="button" onClick={() => {setEditingId(null); setFormData({name: '', price: '', image: '', description: '', category: ''})}} className="bg-gray-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-600 mt-2">
                 Cancel Edit
               </button>
             )}
           </form>
           
           <h3 className="font-bold mt-8 mb-4 border-b pb-2">Existing Products ({products.length})</h3>
           <div className="max-h-64 overflow-y-auto space-y-2">
             {products.map(p => (
               <div key={p._id} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                 <span className="truncate w-1/2 font-semibold">{p.name}</span>
                 <div className="space-x-2 flex-shrink-0">
                   <button onClick={() => editProduct(p)} className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                   <button onClick={() => deleteProduct(p._id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* View Orders Segment */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col max-h-[800px]">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Customer Orders ({orders.length})</h2>
            <div className="flex space-x-3">
              <button onClick={downloadPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center shadow-sm transition cursor-pointer">
                <Download size={18} className="mr-2"/> Export Daily Report
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {orders.length === 0 ? <p className="text-gray-500">No orders found.</p> : orders.map(order => (
              <div key={order._id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md">
                <div className="flex justify-between items-center font-bold mb-2">
                  <span className="text-base text-gray-700 uppercase tracking-widest text-xs mt-1">ID . {order._id.substring(18)}</span>
                  <span className="text-primary text-xl">KSh {order.total.toLocaleString('en-KE')}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded">
                  <strong>Customer:</strong> {order.user?.name || 'Unknown'} <br/>
                  <span className="text-xs text-gray-500">{order.user?.email || 'No email provided'}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4 border-b border-t py-3 border-gray-100">
                  <div className="text-sm text-gray-700">
                    <strong>Status:</strong> <span className={`ml-1 font-bold px-2 py-1 rounded bg-gray-50 ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{order.status}</span>
                  </div>
                  {order.status !== 'Approved / Processed' && order.status !== 'Approved / Delivered' && (
                     <button onClick={() => updateOrderStatus(order._id)} className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow hover:bg-green-700 transition transform hover:scale-105 cursor-pointer">Approve Order</button>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm font-semibold text-gray-500 mb-2 border-t pt-2 border-gray-100">
                  <span>Order Details ({new Date(order.createdAt).toLocaleDateString()}):</span>
                  {order.isReported && <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded uppercase">Included in System Report</span>}
                </div>
                <div className="max-h-32 overflow-y-auto custom-scrollbar pr-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-50 py-2 text-sm text-gray-700">
                      <span className="truncate w-2/3 font-medium">{item.name}</span>
                      <span className="font-bold text-gray-500 bg-gray-100 px-2 rounded">x{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
