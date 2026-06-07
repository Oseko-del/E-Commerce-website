import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);
    if (res.success) {
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center border-b pb-4">Sign In</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary focus:outline-none" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-primary focus:border-primary focus:outline-none" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-3 rounded-lg transition-colors shadow-md mt-6 flex justify-center items-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-800'}`}>
            {isSubmitting ? <><Loader2 className="animate-spin mr-2" size={20}/> Authenticating...</> : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          New Customer? <Link to="/register" className="text-primary hover:underline font-bold">Register Here</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
