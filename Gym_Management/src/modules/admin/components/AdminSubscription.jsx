import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../../../firebase/firebase';

const AdminSubscription = () => {
  const [subscription, setSubscription] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    imageUrl: '',
    benefits: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscription({ ...subscription, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subscriptionsRef = ref(database, 'subscriptions');
      await push(subscriptionsRef, subscription);
      alert('Subscription Plan Added Successfully!');
      setSubscription({
        title: '',
        description: '',
        price: '',
        duration: '',
        imageUrl: '',
        benefits: '',
      });
    } catch (error) {
      console.error('Error adding subscription plan:', error);
    }
  };

  return (
    <div className="space-x-4 mt-14 pr-2 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-1 md:ml-4 ml-12">Add Subscription Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded-lg">
        <input
          type="text"
          name="title"
          placeholder="Plan Title"
          value={subscription.title}
          onChange={handleChange}
          className="border p-3 sm:p-2 w-full text-base sm:text-sm rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Plan Description"
          value={subscription.description}
          onChange={handleChange}
          className="border p-3 sm:p-2 w-full text-base sm:text-sm rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (INR)"
          value={subscription.price}
          onChange={handleChange}
          className="border p-3 sm:p-2 w-full text-base sm:text-sm rounded"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 1 Month, 3 Months)"
          value={subscription.duration}
          onChange={handleChange}
          className="border p-3 sm:p-2 w-full text-base sm:text-sm rounded"
          required
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={subscription.imageUrl}
          onChange={handleChange}
          className="border p-3 sm:p-2 w-full text-base sm:text-sm rounded"
        />
        <textarea
          name="benefits"
          placeholder="Benefits (Comma-separated)"
          value={subscription.benefits}
          onChange={handleChange}
          className="border p-3 sm:p-2 w-full text-base sm:text-sm rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-3 sm:px-2 sm:py-1 rounded text-base sm:text-sm w-full sm:w-auto"
        >
          Add Subscription Plan
        </button>
      </form>

      {subscription.title && (
        <div className="mt-6 bg-white p-6 sm:p-3 rounded-lg shadow w-full">
          <h2 className="text-lg sm:text-base font-semibold">Preview:</h2>
          {subscription.imageUrl && (
            <img
              src={subscription.imageUrl}
              alt={subscription.title}
              className="h-40 w-full object-cover rounded mt-2"
            />
          )}
          <h3 className="text-xl sm:text-lg font-bold mt-3">{subscription.title}</h3>
          <p className="text-base sm:text-sm">{subscription.description}</p>
          <p className="text-base sm:text-sm"><strong>Price:</strong> ₹{subscription.price}</p>
          <p className="text-base sm:text-sm"><strong>Duration:</strong> {subscription.duration}</p>
          <p className="text-base sm:text-sm"><strong>Benefits:</strong> {subscription.benefits}</p>
        </div>
      )}
    </div>
  );
};

export default AdminSubscription;
