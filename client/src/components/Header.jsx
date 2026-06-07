import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, User as UserIcon, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileOpen(false);
  };

  const MobileLink = ({ to, children }) => (
    <Link to={to} onClick={() => setIsMobileOpen(false)} className="block py-4 px-6 hover:bg-blue-800 text-white border-b border-blue-800 transition-colors font-semibold tracking-wide">
      {children}
    </Link>
  );

  return (
    <header className="bg-primary text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-widest uppercase">Alpha</Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center font-semibold">
          <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-blue-200 transition-colors">Products</Link>
          <Link to="/reviews" className="hover:text-blue-200 transition-colors">Reviews</Link>
          <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
          
          <Link to="/cart" className="relative flex items-center hover:text-blue-200 transition-colors">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative group ml-4">
              <button className="flex items-center space-x-1 hover:text-blue-200 transition-colors border border-white/20 px-3 py-1.5 rounded-full bg-white/10">
                <UserIcon size={18} />
                <span className="font-bold">{user.name}</span>
              </button>
              <div className="absolute right-0 pt-2 w-48 z-10 hidden group-hover:block transition-all">
                <div className="bg-white rounded-xl shadow-xl py-2 border border-gray-100 overflow-hidden">
                  {user.isAdmin ? (
                    <Link to="/admin" className="block px-4 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-primary">Admin Dashboard</Link>
                  ) : (
                    <Link to="/profile" className="block px-4 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-primary">My Orders</Link>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center transition-colors">
                    <LogOut size={16} className="mr-2" /> Secure Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-primary hover:bg-white border border-white transition-colors flex items-center px-4 py-1.5 rounded-full font-bold ml-4">
              <UserIcon size={18} className="mr-2" /> Login
            </Link>
          )}
        </nav>
        
        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-6">
           <Link to="/cart" className="relative flex items-center text-white">
            <ShoppingCart size={26} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md border border-primary">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="focus:outline-none p-1 rounded-md hover:bg-white/10 transition-colors">
            {isMobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden w-full bg-primary shadow-2xl z-40 border-t border-blue-700 animate-fade-in origin-top">
           <MobileLink to="/">Home</MobileLink>
           <MobileLink to="/products">Store Catalog</MobileLink>
           <MobileLink to="/reviews">Product Reviews</MobileLink>
           <MobileLink to="/contact">Contact Support</MobileLink>
           
           <div className="bg-blue-900 border-t border-blue-950">
             {user ? (
               <>
                 {user.isAdmin ? (
                   <MobileLink to="/admin">🔐 Admin Dashboard</MobileLink>
                 ) : (
                   <MobileLink to="/profile">📦 Track My Orders</MobileLink>
                 )}
                 <button onClick={handleLogout} className="w-full text-left py-4 px-6 hover:bg-red-600 text-white font-bold flex items-center transition-colors">
                   <LogOut size={20} className="mr-3" /> Logout ({user.name})
                 </button>
               </>
             ) : (
               <Link to="/login" onClick={() => setIsMobileOpen(false)} className="block py-4 px-6 bg-white text-primary font-black flex items-center">
                 <UserIcon size={20} className="mr-3" /> Secure Login
               </Link>
             )}
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;
