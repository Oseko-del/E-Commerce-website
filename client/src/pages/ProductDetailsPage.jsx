import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const { data: prodData } = await axios.get(`/api/products/${id}`);
        setProduct(prodData);
        const { data: revData } = await axios.get(`/api/reviews/${id}`);
        setReviews(revData);
        setLoading(false);
      } catch (err) {
        const mockProduct = { _id: id, name: 'Alpha Signature Product', price: 2990, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=60', category: 'Premium Care', description: 'This is a premium mock product for visual testing since the database is disconnected.' };
        setProduct(mockProduct);
        setLoading(false);
      }
    };
    fetchProductAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: Number(qty)
    });
    toast.success('Added to cart!');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/reviews', {
        product: product._id,
        message: reviewMessage,
        rating: reviewRating
      }, config);
      toast.success('Review submitted!');
      setReviewMessage('');
      setReviewRating(5);
      
      const { data: revData } = await axios.get(`/api/reviews/${id}`);
      setReviews(revData);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold text-primary">Loading...</div>;

  return (
    <div>
      <Link to="/products" className="text-primary hover:underline font-bold mb-6 inline-block">&larr; Back to Products</Link>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-12">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 md:p-12 bg-gray-50 flex items-center justify-center">
            <img src={product.image} alt={product.name} loading="lazy" className="max-w-full h-96 object-contain rounded-lg shadow-sm" />
          </div>
          <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-widest text-sm text-gray-500 font-bold mb-2">{product.category}</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed text-justify max-h-48 overflow-y-auto pr-4 custom-scrollbar">{product.description}</p>
            <div className="text-4xl font-black text-primary mb-8">KSh {product.price?.toLocaleString('en-KE')}</div>
            
            <div className="flex items-center space-x-4 mb-8">
              <label className="font-bold text-gray-700">Quantity:</label>
              <input 
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-24 text-center focus:ring-primary focus:border-primary font-bold"
              />
            </div>
            
            <button onClick={handleAddToCart} className="w-full bg-primary hover:bg-blue-800 text-white text-xl font-bold py-4 rounded-lg shadow-md transition-colors uppercase tracking-wider">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 grid md:grid-cols-2 gap-12">
        {/* View Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <div className="text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">No reviews yet. Be the first to review this product!</div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-3 custom-scrollbar">
              {reviews.map((rev) => (
                <div key={rev._id} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2">
                    <strong className="text-gray-800 text-sm">{rev.user?.name || 'Verified Customer'}</strong>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} size={14} className={star <= rev.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{rev.message}</p>
                  <div className="text-xs text-gray-400 mt-2 text-right">{new Date(rev.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write a Review */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Write a Review</h2>
          {user ? (
            <form onSubmit={submitReviewHandler} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3">Your Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={32} 
                      className={`cursor-pointer transition-transform hover:scale-110 ${star <= reviewRating ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-300'}`} 
                      onClick={() => setReviewRating(star)} 
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Comment</label>
                <textarea rows="4" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none custom-scrollbar" value={reviewMessage} onChange={(e) => setReviewMessage(e.target.value)} required placeholder="Share your experience..."></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition tracking-wide">Submit Review</button>
            </form>
          ) : (
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 text-center">
              <p className="text-gray-700 mb-3">Please sign in to share a review.</p>
              <Link to="/login" className="bg-primary text-white font-bold py-2 px-6 rounded shadow hover:bg-blue-800 transition inline-block">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
