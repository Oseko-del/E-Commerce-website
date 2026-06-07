import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All', 'Electronics', 'Fashion & Clothing', 'Shoes & Footwear', 'Beauty & Cosmetics',
    'Home & Living', 'Kitchen & Appliances', 'Supermarket / Groceries', 'Health & Wellness',
    'Sports & Outdoors', 'Automotive Parts & Accessories', 'Skincare', 'Haircare', 'Hygiene', 'Premium Care'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setProducts([
          { _id: '1', name: 'Alpha Gentle Cleanser', price: 2490, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571', category: 'Skincare' },
          { _id: '2', name: 'Alpha Hydrating Serum', price: 3990, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', category: 'Skincare' },
          { _id: '3', name: 'Alpha Daily Moisturizer', price: 2990, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b', category: 'Skincare' },
          { _id: '4', name: 'Alpha Shampoo Pro', price: 1990, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d', category: 'Haircare' }
        ]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || p.category === category;
    return matchSearch && matchCategory;
  });

  if (loading) return <div className="text-center py-20 text-xl text-primary font-bold">Loading products...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-6 gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
          {/* Category Filter */}
          <div className="relative w-full sm:w-56">
            <select 
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none bg-white shadow-sm" 
              value={category} 
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Filter className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center">
           <Search size={48} className="text-gray-300 mb-4" />
           <h3 className="text-xl font-bold text-gray-600 mb-2">No products found</h3>
           <p className="text-gray-500">Try adjusting your search criteria or changing categories.</p>
           <button onClick={() => {setSearch(''); setCategory('All')}} className="mt-6 text-primary hover:underline font-semibold">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden product-card border border-gray-100 flex flex-col group">
              <img src={product.image} alt={product.name} loading="lazy" className="w-full h-48 object-contain bg-white p-2 group-hover:scale-105 transition-transform" />
              <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                <div className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">{product.category}</div>
                <h2 className="text-lg font-bold text-gray-800 mb-2 truncate" title={product.name}>{product.name}</h2>
                <div className="text-xl font-black text-primary mb-4">KSh {product.price.toLocaleString('en-KE')}</div>
                <div className="mt-auto">
                  <Link to={`/products/${product._id}`} className="block w-full text-center bg-primary text-white font-bold py-2.5 rounded hover:bg-blue-800 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
