import { useEffect, useState } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { database } from '../../firebase/firebase';
import { useAuth } from '../../contexts/authContext/index';

const ProductShowcase = ({ onNewOrderNotification }) => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setRazorpayLoaded(false);

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
    });

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      const unsubscribeUser = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name || '');
          setPhoneNumber(userData.contact || '');
          setAddress(userData.address || '');
        }
      });
      return () => {
        unsubscribeProducts();
        unsubscribeUser();
      };
    }

    return () => unsubscribeProducts();
  }, [currentUser]);

  const validateFields = () => {
    const errorsObj = {};
    if (!name.trim()) errorsObj.name = 'Name is required';
    if (!phoneNumber.trim()) errorsObj.phoneNumber = 'Phone number is required';
    if (!address.trim()) errorsObj.address = 'Address is required';
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  };

  const handleBuyNow = (product) => {
    if (!currentUser) {
      alert('Please log in to place an order.');
      return;
    }
    setCartProduct(product);
    setIsCartOpen(true);
  };

  const handlePayment = async () => {
    if (!validateFields()) return;
    if (!razorpayLoaded) {
      alert('Razorpay SDK not loaded. Please wait...');
      return;
    }

    const options = {
      key: 'rzp_test_34L84Hf6UuzELW',
      amount: cartProduct.price * 100,
      currency: 'INR',
      name: 'Santoryu',
      description: `Payment for ${cartProduct.name}`,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmMX0XrBnk9GaRXGzYxEQG4QP2DU_z5Wncdg&s',
      handler: (response) => handleConfirmOrder(response.razorpay_payment_id),
      prefill: { name, email: currentUser?.email || '', contact: phoneNumber },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleConfirmOrder = async (paymentId) => {
    const orderDetails = {
      productId: cartProduct.id,
      productName: cartProduct.name,
      price: cartProduct.price,
      name,
      phoneNumber,
      address,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      paymentId,
      timestamp: Date.now(),
    };

    try {
      const orderRef = push(ref(database, 'notifications/Orders'));
      const orderId = orderRef.key;

      await set(orderRef, { ...orderDetails, orderId });
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);

      onNewOrderNotification?.(orderDetails);

      setIsCartOpen(false);
      setCartProduct(null);
    } catch (error) {
      console.error('Firebase Order Save Error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="relative p-4" id='product'>
      <h1 className="text-4xl font-bold uppercase mb-4 text-center">Supplement Store</h1>
      <p className='text-center text-gray-500 pb-4'>Fuel Your Fitness, Power Your Potential</p>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] border rounded-lg p-4 shadow-lg bg-white">
            <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-medium mt-1">Price: ₹{product.price}</p>
            <button onClick={() => handleBuyNow(product)} className="bg-blue-600 text-white px-4 py-2 mt-3 rounded">Buy Now</button>
          </div>
        ))}
      </div>

      {isCartOpen && cartProduct && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h2>Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>✖</button>
          </div>
          <div className="p-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="border p-2 w-full mt-2" />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border p-2 w-full mt-2" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            <p className="text-xs text-red-500 mt-1">Please check your details before confirming the order.</p>
            <button onClick={handlePayment} className="bg-green-500 text-white w-full p-2 mt-4">Proceed to Pay & Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
