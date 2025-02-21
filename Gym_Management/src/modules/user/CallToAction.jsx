import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import Footer from '../../components/header/Footer';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleFeedbackSubmit = async () => {
    if (feedback.trim() === '') return;

    const db = getDatabase();
    const feedbackRef = ref(db, 'feedbacks');

    await push(feedbackRef, {
      userId: user.uid,
      feedback,
      timestamp: Date.now(),
    });

    setFeedback('');
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="relative bg-blue-600 text-white pt-10 pb-4 px-4 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.2] pointer-events-none" />

      {/* Content */}
      <div className="relative text-center space-y-6 max-w-5xl mx-auto">
        {user ? (
          <>
            <h2 className="text-2xl md:text-6xl font-bold uppercase leading-snug tracking-tight">
              We value your experience! <br />Please provide your feedback.</h2>
            <p className="text-sm md:text-lg leading-relaxed">We strive for excellence—your insights help us reach it. Share your thoughts!</p>
            <div className="mt-4">
              <input
                className="w-full p-3 text-black rounded-md"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}/>
              <button
                onClick={handleFeedbackSubmit}
                className="bg-white text-blue-600 mt-4 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Submit Feedback
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl md:text-6xl font-bold uppercase leading-snug tracking-tight">
              What are you waiting for? <br />Let’s register yourself now.
            </h2>
            <p className="text-sm md:text-lg leading-relaxed">
              Here, we not only offer the best fitness equipment but also a supportive environment and training programs specifically designed to help you achieve your fitness goals.
            </p>
            <Link to="/register">
              <button className="bg-white text-blue-600 mt-4 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Start Now
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="rounded-md mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default CallToAction;
