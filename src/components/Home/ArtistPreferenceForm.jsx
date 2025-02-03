import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ArtistPreferenceForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', number: '', artist: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappLink = `https://wa.me/<YOUR_NUMBER>?text=Name:%20${formData.name}%0ANumber:%20${formData.number}%0AArtist:%20${formData.artist}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full pt-14">
      <div className="flex justify-center items-center relative my-14">
        {[
          { size: 'w-16 h-16', zIndex: 'z-10', offset: '-left-40', img: 'https://artistbookingcompany.com/wp-content/uploads/2024/03/badshah-680x680.jpg' },
          { size: 'w-20 h-20', zIndex: 'z-20', offset: '-left-28', img: 'https://i.scdn.co/image/ab6761610000e5eb29f045bb0d86147623b01b24' },
          { size: 'w-24 h-24', zIndex: 'z-30',  img: 'https://m.media-amazon.com/images/I/7142A60vpNS._UF1000,1000_QL80_.jpg' },
          { size: 'w-20 h-20', zIndex: 'z-20', offset: '-right-28', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDrSD4EcvrYXlUo-O2qKzTVysyXB1I8oTsA&s' },
          { size: 'w-16 h-16', zIndex: 'z-10', offset: '-right-40', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPBhGrs7b3Q4lJyF83GbFNLSpK5fz5a8psA&s' },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.offset} ${item.size} rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ${item.zIndex}`}
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={item.img}
              alt={`Artist ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>      
      <h1 className="text-2xl text-gray-100 font-bold mb-2">Tell us which artist you like</h1>
      <p className="text-gray-300 text-sm mb-4">We'll create an experience just for you</p>

      <a href="https://opener.pl/en/artist-poll-2024" target='_blank'><button  
        className="bg-gray-50 text-black px-4 py-1 rounded-3xl hover:bg-gray-500 transition duration-300">
        Let's Go
      </button></a>

      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 p-4 bg-white rounded-lg shadow-lg w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Favorite Artist</label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default ArtistPreferenceForm;