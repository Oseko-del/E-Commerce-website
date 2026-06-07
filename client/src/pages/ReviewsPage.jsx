import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('/api/reviews');
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl font-bold text-primary">Loading reviews...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 text-center">Customer Reviews</h1>
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">No reviews yet.</div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-start md:space-x-4">
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl uppercase">
                  {review.user?.name ? review.user.name.charAt(0) : 'U'}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{review.user?.name || 'Anonymous User'}</h3>
                  <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{review.message}"</p>
                {review.product && (
                  <div className="mt-4 text-sm text-primary font-bold">
                    Reviewed Product ID: {review.product}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
