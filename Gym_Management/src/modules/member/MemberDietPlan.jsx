import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebase';

const MemberDietPlan = () => {
  const [dietPlans, setDietPlans] = useState({});
  const [expandedPlan, setExpandedPlan] = useState(null);

  useEffect(() => {
    const dietPlansRef = ref(database, 'dietPlans');
    const unsubscribe = onValue(dietPlansRef, (snapshot) => {
      if (snapshot.exists()) {
        setDietPlans(snapshot.val());
      } else {
        setDietPlans({});
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleExpand = (key) => {
    setExpandedPlan(expandedPlan === key ? null : key);
  };

  return (
    <div className="p-4 py-10 bg-gray-50" id="diet-plan">
      <h1 className="text-4xl font-bold uppercase mb-4 text-center">Diet Plans for Members</h1>
      <p className='text-center text-gray-500 pb-4'>Fuel your body with the right nutrition, and watch it perform at its best.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {Object.keys(dietPlans).map((key) => (
          <div key={key} className="bg-white p-4 shadow-lg rounded-lg">
            <img
              src={dietPlans[key].imageUrl}
              alt={dietPlans[key].title}
              className="w-full h-56 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3">{dietPlans[key].title}</h3>
            <p className="text-gray-600 truncate mb-2">{dietPlans[key].description}</p>
            <button
              onClick={() => toggleExpand(key)}
              className="text-blue-500 underline focus:outline-none"
            >
              {expandedPlan === key ? 'Hide Details' : 'View Details'}
            </button>

            {expandedPlan === key && (
              <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                <p><strong>Breakfast:</strong> {dietPlans[key].breakfast}</p>
                <p><strong>Lunch:</strong> {dietPlans[key].lunch}</p>
                <p><strong>Dinner:</strong> {dietPlans[key].dinner}</p>
                <p><strong>Snacks:</strong> {dietPlans[key].snacks}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberDietPlan;
