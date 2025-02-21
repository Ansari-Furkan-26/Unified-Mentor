import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../../../firebase/firebase'; // Adjust as per your setup

const AdminDietPlanForm = () => {
  const [dietPlan, setDietPlan] = useState({
    title: '',
    description: '',
    imageUrl: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDietPlan({ ...dietPlan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dietPlansRef = ref(database, 'dietPlans');
      await push(dietPlansRef, dietPlan);
      alert('Diet Plan Added Successfully!');
      setDietPlan({
        title: '',
        description: '',
        imageUrl: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: '',
      });
    } catch (error) {
      console.error('Error adding diet plan:', error);
    }
  };

  return (
    <div className="px-4 bg-gray-50 mt-14 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 md:ml-0 ml-8 mt-1">Add Diet Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded-lg">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={dietPlan.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={dietPlan.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={dietPlan.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="breakfast"
          placeholder="Breakfast Details"
          value={dietPlan.breakfast}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="lunch"
          placeholder="Lunch Details"
          value={dietPlan.lunch}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="dinner"
          placeholder="Dinner Details"
          value={dietPlan.dinner}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="snacks"
          placeholder="Snacks Details"
          value={dietPlan.snacks}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Diet Plan
        </button>
      </form>

      {/* Preview Section */}
      {dietPlan.title && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Preview:</h2>
          <img src={dietPlan.imageUrl} alt={dietPlan.title} className="h-48 w-full object-cover rounded mt-2" />
          <h3 className="text-xl font-bold mt-3">{dietPlan.title}</h3>
          <p>{dietPlan.description}</p>
          <p><strong>Breakfast:</strong> {dietPlan.breakfast}</p>
          <p><strong>Lunch:</strong> {dietPlan.lunch}</p>
          <p><strong>Dinner:</strong> {dietPlan.dinner}</p>
          <p><strong>Snacks:</strong> {dietPlan.snacks}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDietPlanForm;
