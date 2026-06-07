import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-8 border-b pb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Send us a Message</h2>
          <form className="space-y-4">
             <div>
               <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
               <input type="text" className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name"/>
             </div>
             <div>
               <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
               <input type="email" className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Email"/>
             </div>
             <div>
               <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
               <textarea rows="4" className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help?"></textarea>
             </div>
             <button type="button" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
               Submit
             </button>
          </form>
        </div>
        
        <div className="bg-primary text-white p-8 rounded-xl shadow-md flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-6">Contact Information</h2>
          <p className="mb-8 text-gray-200">
            Have questions about our products or your order? We are here to help. Reach out to us through any of the channels below.
          </p>
          <div className="space-y-6">
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-4 text-blue-200" />
              <div>
                <p className="font-semibold">Phone</p>
                <a href="tel:0794230002" className="text-gray-200 hover:text-white transition">0794230002</a>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4 text-blue-200" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:leyladyche@gmail.com" className="text-gray-200 hover:text-white transition">leyladyche@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-4 text-blue-200" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-200">Alpha Business Center, Main Street</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
