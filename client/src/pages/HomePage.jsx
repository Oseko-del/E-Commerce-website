import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setAllProducts(data);
        setFeatured([...data].sort(() => 0.5 - Math.random()).slice(0, 3));
      } catch (err) {
        const mock = [
          { _id: '1', name: 'Alpha Gentle Cleanser', price: 2490, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=60', category: 'Skincare' },
          { _id: '2', name: 'Alpha Hydrating Serum', price: 3990, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=60', category: 'Skincare' },
          { _id: '3', name: 'Alpha Daily Moisturizer', price: 2990, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=60', category: 'Skincare' },
          { _id: '4', name: 'Alpha Shampoo Pro', price: 1990, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=60', category: 'Haircare' }
        ];
        setAllProducts(mock);
        setFeatured([...mock].sort(() => 0.5 - Math.random()).slice(0, 3));
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length <= 3) return;
    const interval = setInterval(() => {
      // Rotate completely randomly
      setFeatured([...allProducts].sort(() => 0.5 - Math.random()).slice(0, 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [allProducts]);

  return (
    <div className="animate-fade-in">
      <div className="bg-primary text-white rounded-xl overflow-hidden mb-12 shadow-xl">
        <div className="px-8 py-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Premium Personnel Care Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg">
              Discover top-quality care products tailored for your everyday needs. Shop trusted brands at unbeatable prices directly in Kenya.
            </p>
            <div className="pt-4">
              <Link to="/products" className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 hidden md:flex justify-center">
            <div className="bg-white/20 p-8 rounded-full backdrop-blur-sm">
              <div className="w-64 h-64 bg-white/30 rounded-full flex items-center justify-center border-4 border-white/50 shadow-2xl">
                 <span className="text-4xl font-bold text-white tracking-widest">ALPHA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-primary pb-2 inline-block">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline font-semibold">View All Items</Link>
        </div>
        
        {featured.length === 0 ? (
           <div className="text-center py-6 text-gray-400">Loading featured products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
             {featured.map((product) => (
               <Link key={product._id} to={`/products/${product._id}`} className="bg-white rounded-xl shadow-md overflow-hidden product-card border border-gray-100 flex flex-col group block animate-fade-in">
                 <div className="overflow-hidden h-56">
                   <img 
                     src={product.image} 
                     alt={product.name} 
                     loading="lazy" 
                     className="w-full h-full object-contain p-4 bg-white transform group-hover:scale-110 transition-transform duration-500" 
                   />
                 </div>
                 <div className="p-4 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate w-full text-center">{product.name}</h3>
                    <div className="text-primary font-bold text-xl">KSh {product.price.toLocaleString('en-KE')}</div>
                 </div>
               </Link>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
