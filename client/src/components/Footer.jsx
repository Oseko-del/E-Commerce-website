import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Alpha Personnel Care Solution</h3>
          <p className="text-gray-300 text-sm mb-4">
            Providing high-quality personnel care products for your daily needs. Your satisfaction is our priority.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Info</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Phone: <a href="tel:0794230002" className="hover:text-white transition-colors">0794230002</a></li>
            <li>Email: <a href="mailto:leyladyche@gmail.com" className="hover:text-white transition-colors">leyladyche@gmail.com</a></li>
            <li>Address: Business Center, Suite 100</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-blue-800 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Alpha Personnel Care Solution. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
