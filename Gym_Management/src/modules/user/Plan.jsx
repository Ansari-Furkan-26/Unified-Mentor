import React from 'react';

const Plans = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Our Plans</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-72 text-center">
            <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
            <p className="text-gray-600 mb-6">For starters who want to get a feel of the platform</p>
            <span className="text-2xl font-semibold">$19/month</span>
            <button className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition duration-300">Sign Up</button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-72 text-center">
            <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-gray-600 mb-6">For serious learners looking for premium features</p>
            <span className="text-2xl font-semibold">$49/month</span>
            <button className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition duration-300">Sign Up</button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-72 text-center">
            <h3 className="text-xl font-semibold mb-4">Enterprise Plan</h3>
            <p className="text-gray-600 mb-6">For businesses and teams looking for advanced features</p>
            <span className="text-2xl font-semibold">$99/month</span>
            <button className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition duration-300">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
