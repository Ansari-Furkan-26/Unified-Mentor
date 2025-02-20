import { useEffect, useState } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { database } from '../../firebase/firebase';
import { useAuth } from '../../contexts/authContext/index';

const Subscription = () => {
  const { currentUser } = useAuth();
  const [subscriptions, setSubscriptions] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const subscriptionsRef = ref(database, 'subscriptions');
    const unsubscribe = onValue(subscriptionsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSubscriptions(snapshot.val());
      } else {
        setSubscriptions({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectPlan = (planKey, planData) => {
    if (!currentUser) {
      alert('Please log in to select a plan.');
      return;
    }

    setSelectedPlan({ key: planKey, ...planData });
    setIsConfirmPopupOpen(true);
  };

  const handlePaymentSuccess = async (response) => {
    const userPlanRef = ref(database, `userPlans/${currentUser.uid}`);
    const notificationRef = ref(database, 'notifications/subscription');

    const purchaseDate = new Date();
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const formattedPurchaseDate = purchaseDate.toISOString().split('T')[0];
    const formattedExpiryDate = expiryDate.toISOString().split('T')[0];

    await set(userPlanRef, {
      plan: selectedPlan.title,
      price: selectedPlan.price,
      selectedAt: formattedPurchaseDate,
      expiryDate: formattedExpiryDate,
    });

    await push(notificationRef, {
      title: 'New Subscription',
      message: `${currentUser.displayName || 'A user'} subscribed to the "${selectedPlan.title}" plan.`,
      targetUserId: currentUser.uid,
      type: 'subscription',
      timestamp: new Date().toISOString(),
    });

    setIsConfirmPopupOpen(false);
    setSuccessMessage('Congratulations!🎉 Your plan has been activated.');

    setTimeout(() => {
      setSuccessMessage('');
      window.location.href = '/home#product';
    }, 3000);
  };

  const handlePayment = () => {
    if (!selectedPlan) return;

    const options = {
      key: 'rzp_test_34L84Hf6UuzELW',
      amount: selectedPlan.price * 100,
      currency: 'INR',
      name: 'Santoryu',
      description: selectedPlan.title,
      handler: handlePaymentSuccess,
      prefill: {
        name: currentUser.displayName,
        email: currentUser.email,
      },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="relative py-8" id="membership">
      <div className="top-0 bg-white p-4 z-10">
        <h1 className="text-4xl font-bold uppercase text-center">Training Program we offer for you</h1>
        <p className='text-center text-gray-500 pt-4'>The training programs we offer are designed to provide the best results.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {Object.keys(subscriptions).map((key) => {
          const plan = subscriptions[key];
          return (
            <div
              key={key}
              className="bg-white p-6 shadow-xl rounded-lg hover:scale-105 transition-transform cursor-pointer"
            >
              {plan.imageUrl && (
                <img
                  src={plan.imageUrl}
                  alt={plan.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <h3 className="text-xl font-semibold mt-3">{plan.title}</h3>
              <p className="text-gray-600 truncate">{plan.description}</p>
              <p className="text-lg font-bold">Price: ₹{plan.price}</p>
              <p>Duration: {plan.duration}</p>
              <button
                onClick={() => handleSelectPlan(key, plan)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
              >
                Select Plan
              </button>
            </div>
          );
        })}
      </div>

      {isConfirmPopupOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-opacity-40 bg-black flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setIsConfirmPopupOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-3">Confirm Your Plan</h2>
            <p className="font-semibold">{selectedPlan.title}</p>
            <p>Price: ₹{selectedPlan.price}</p>
            <p>Duration: {selectedPlan.duration}</p>

            <button
              onClick={handlePayment}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg w-full"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed top-16 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Subscription;
