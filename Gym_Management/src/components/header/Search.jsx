import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const SearchEngine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState([]);
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = ref(database, 'subscriptions');
    const fetchProducts = ref(database, 'products');

    const unsubPlans = onValue(fetchPlans, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const plansArray = Object.keys(data).map((key) => ({
          id: key,
          type: 'plan',
          ...data[key],
        }));
        setPlans(plansArray);
      }
    });

    const unsubProducts = onValue(fetchProducts, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productsArray = Object.keys(data).map((key) => ({
          id: key,
          type: 'product',
          ...data[key],
        }));
        setProducts(productsArray);
      }
    });

    return () => {
      unsubPlans();
      unsubProducts();
    };
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    const filteredPlans = plans.filter((plan) =>
      (plan.name || '').toLowerCase().includes(lowerSearchTerm)
    );

    const filteredProducts = products.filter((product) =>
      (product.name || '').toLowerCase().includes(lowerSearchTerm)
    );

    setResults([...filteredPlans, ...filteredProducts]);
  }, [searchTerm, plans, products]);

  const handleNavigate = (item) => {
    if (item.type === 'plan') {
      navigate('/#membership'); // Navigate to Membership section
    } else if (item.type === 'product') {
      navigate('/home#product'); // Navigate to Products section
    }
  };

  return (
    <div className="relative w-full max-w-lg py-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder=" Search supplements..."
        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      {results.length > 0 && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
              onClick={() => handleNavigate(item)}
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{item.name || 'No Name'}</h3>
                <p className="text-sm text-gray-600 truncate max-w-96">
                  {item.description || 'No description available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && searchTerm.trim() && (
        <p className="text-gray-500 mt-2">No results found</p>
      )}
    </div>
  );
};

export default SearchEngine;
