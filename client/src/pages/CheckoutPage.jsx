import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, CreditCard, Smartphone, Building, Truck, Info, HandCoins } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa_stk');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const deliveryFee = subtotal > 0 ? 500 : 0; 
  const discount = 0; 
  const finalTotalAmount = subtotal + deliveryFee - discount;

  const placeOrderHandler = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.post('/api/orders', {
        items: cartItems,
        total: finalTotalAmount,
        paymentMethod
      }, config);
      clearCart();
      toast.success('Order Placed Successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to place order');
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded hover:bg-blue-800">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Payment Methods Section (Left Side) */}
      <div className="lg:w-7/12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center">
          <HandCoins className="mr-3 text-primary" size={28}/> Payment Methods
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          
          {/* STK Push */}
          <div className={`border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'mpesa_stk' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`} onClick={() => setPaymentMethod('mpesa_stk')}>
            <div className="flex items-center space-x-3">
              <Smartphone className={paymentMethod === 'mpesa_stk' ? 'text-green-600' : 'text-gray-500'} />
              <h3 className={`font-bold text-lg ${paymentMethod === 'mpesa_stk' ? 'text-green-800' : 'text-gray-800'}`}>M-Pesa STK Push</h3>
            </div>
            {paymentMethod === 'mpesa_stk' && (
              <div className="ml-9 mt-4 text-sm text-gray-700 space-y-3 animate-fade-in">
                <p>An automatic payment prompt will be sent directly to your phone. Enter your pin to authorize.</p>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">Mobile Number</label>
                  <input type="text" defaultValue="0794230002" className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>
            )}
          </div>

          {/* Paybill */}
          <div className={`border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'mpesa_paybill' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`} onClick={() => setPaymentMethod('mpesa_paybill')}>
            <div className="flex items-center space-x-3">
              <Building className={paymentMethod === 'mpesa_paybill' ? 'text-green-600' : 'text-gray-500'} />
              <h3 className={`font-bold text-lg ${paymentMethod === 'mpesa_paybill' ? 'text-green-800' : 'text-gray-800'}`}>M-Pesa Paybill</h3>
            </div>
            {paymentMethod === 'mpesa_paybill' && (
              <div className="ml-9 mt-4 text-sm text-gray-700 bg-white p-4 rounded-lg border border-green-100 shadow-sm animate-fade-in">
                <div className="flex flex-col space-y-2">
                  <span className="flex justify-between border-b pb-2"><strong className="text-gray-900">Business Number:</strong> 123456</span>
                  <span className="flex justify-between pt-1"><strong className="text-gray-900">Account Number:</strong> <i>Your Phone Number or Order ID</i></span>
                </div>
              </div>
            )}
          </div>

          {/* Till Number */}
          <div className={`border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'mpesa_till' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`} onClick={() => setPaymentMethod('mpesa_till')}>
             <div className="flex items-center space-x-3">
               <Building className={paymentMethod === 'mpesa_till' ? 'text-green-600' : 'text-gray-500'} />
               <h3 className={`font-bold text-lg ${paymentMethod === 'mpesa_till' ? 'text-green-800' : 'text-gray-800'}`}>M-Pesa Till Number</h3>
            </div>
            {paymentMethod === 'mpesa_till' && (
              <div className="ml-9 mt-4 text-sm text-gray-700 bg-white p-4 rounded-lg border border-green-100 shadow-sm animate-fade-in space-y-2">
                <p><strong>Till Number:</strong> <span className="text-green-700 font-bold text-lg ml-2 tracking-widest">987654</span></p>
                <p className="text-gray-500 mt-2 bg-gray-50 p-2 rounded"><i>Instructions: Go to Lipa na M-Pesa → Buy Goods and Services → Enter Till Number</i></p>
              </div>
            )}
          </div>

          {/* Bank Transfer */}
          <div className={`border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => setPaymentMethod('bank')}>
             <div className="flex items-center space-x-3">
              <Building className={paymentMethod === 'bank' ? 'text-blue-600' : 'text-gray-500'} />
              <h3 className={`font-bold text-lg ${paymentMethod === 'bank' ? 'text-blue-800' : 'text-gray-800'}`}>Bank Transfer</h3>
            </div>
            {paymentMethod === 'bank' && (
              <div className="ml-9 mt-4 text-sm text-gray-700 bg-white p-5 rounded-lg border border-blue-100 shadow-sm animate-fade-in flex space-x-3 items-center">
                <span className="text-2xl">⏳</span>
                <p className="font-bold text-gray-800">Bank Transfer processing is coming soon.</p>
              </div>
            )}
          </div>

          {/* Card */}
          <div className={`border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary ring-1 ring-primary bg-indigo-50' : 'hover:bg-gray-50'}`} onClick={() => setPaymentMethod('card')}>
             <div className="flex items-center space-x-3">
              <CreditCard className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-500'} />
              <h3 className={`font-bold text-lg ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-800'}`}>Card Payment (Visa / Mastercard)</h3>
            </div>
            {paymentMethod === 'card' && (
              <div className="ml-9 mt-4 text-sm text-gray-700 space-y-4 animate-fade-in bg-white p-5 border border-indigo-100 rounded-lg">
                 <div>
                   <label className="text-xs font-bold text-gray-600 block mb-1">Cardholder Name</label>
                   <input type="text" placeholder="John Doe" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary" />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-600 block mb-1">Card Number</label>
                   <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary font-mono tracking-widest" />
                 </div>
                 <div className="flex space-x-4">
                   <div className="w-1/2">
                     <label className="text-xs font-bold text-gray-600 block mb-1">Expiry (MM/YY)</label>
                     <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary" />
                   </div>
                   <div className="w-1/2">
                     <label className="text-xs font-bold text-gray-600 block mb-1">CVV</label>
                     <input type="text" placeholder="123" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary" />
                   </div>
                 </div>
              </div>
            )}
          </div>

          {/* Cash on Delivery */}
          <div className={`border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-yellow-500 ring-1 ring-yellow-500 bg-yellow-50' : 'hover:bg-gray-50'}`} onClick={() => setPaymentMethod('cod')}>
             <div className="flex items-center space-x-3">
              <Truck className={paymentMethod === 'cod' ? 'text-yellow-600' : 'text-gray-500'} />
              <h3 className={`font-bold text-lg ${paymentMethod === 'cod' ? 'text-yellow-800' : 'text-gray-800'}`}>Cash on Delivery</h3>
            </div>
            {paymentMethod === 'cod' && (
              <div className="ml-9 mt-4 text-sm text-yellow-800 bg-white p-4 rounded-lg border border-yellow-200 shadow-sm animate-fade-in flex space-x-3 items-center">
                <span className="text-2xl">⚠️</span>
                <p>Cash on delivery is currently only available for logistics serving the Nairobi Metropolis area.</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Instructions Box */}
        <div className="mt-6 bg-blue-50 text-blue-900 p-5 rounded-xl border border-blue-200 shadow-inner flex items-start space-x-4">
          <Info className="flex-shrink-0 mt-0.5" size={24}/>
          <p className="text-sm font-medium leading-relaxed">
            Use your <strong className="font-bold underline">Order ID</strong> as a reference when paying via Paybill, Bank Transfer, or Till Number. Your order will be immediately processed straight to delivery upon M-Pesa / Bank payment confirmation.
          </p>
        </div>
      </div>

      {/* Order Summary Section (Right Side) */}
      <div className="lg:w-5/12">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
          <h2 className="text-2xl font-bold border-b pb-4 mb-5 text-gray-800">Order Summary</h2>
          
          <div className="max-h-64 overflow-y-auto mb-6 border-b pb-4 space-y-4 pr-3 custom-scrollbar">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm items-center bg-gray-50 p-2 rounded border border-gray-100">
                <div className="flex items-center w-2/3 space-x-3">
                  <img src={item.image} className="w-10 h-10 object-contain rounded bg-white shadow-sm" />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700 truncate" title={item.name}>{item.name}</span>
                    <span className="text-gray-500 text-xs font-semibold">Qty: {item.qty}</span>
                  </div>
                </div>
                <div className="w-1/3 text-right font-bold text-gray-700 text-base flex-shrink-0">
                  KSh {(item.qty * item.price).toLocaleString('en-KE')}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-base text-gray-600 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">KSh {subtotal.toLocaleString('en-KE')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">Delivery Fee <Truck size={14} className="ml-2 text-gray-400"/></span>
              <span className="font-bold text-gray-800">KSh {deliveryFee.toLocaleString('en-KE')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                <span>Discount</span>
                <span className="font-bold">- KSh {discount.toLocaleString('en-KE')}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-2xl font-black text-gray-900 mb-8 border-t pt-6 border-gray-200">
            <span>Final Total</span>
            <span className="text-primary bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 shadow-sm">KSh {finalTotalAmount.toLocaleString('en-KE')}</span>
          </div>

          <button 
            onClick={placeOrderHandler} 
            disabled={loading}
            className={`w-full text-white font-black py-4 rounded-xl shadow-lg transition-transform focus:ring-4 focus:ring-green-300 text-lg uppercase tracking-widest flex justify-center items-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'}`}
          >
            {loading ? <><Loader2 className="animate-spin mr-3" size={24}/> Authorizing...</> : 'Confirm Order & Pay'}
          </button>
          
          <div className="mt-4 flex justify-center space-x-2 text-gray-400">
             <span className="text-xs uppercase tracking-widest font-bold">Secure Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
