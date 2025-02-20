import React from 'react';

const testimonialsData = [
  {
    id: 1,
    name: 'Whitney Simmons',
    comment: '"Joining this program has been life-changing! The guidance and support helped me achieve results I never thought possible."',
    image: 'https://i.pinimg.com/736x/fb/d7/23/fbd723beca37e81ccce77918a98bab31.jpg',
  },
  {
    id: 2,
    name: 'Chris Bumstead',
    comment: '"I finally found a place that truly cares about my progress. The personalized approach made my fitness journey enjoyable and rewarding."',
    image: 'https://i.pinimg.com/736x/e7/54/cf/e754cf6b76e500d19ba2591d4781320c.jpg',
  },
  {
    id: 3,
    name: 'Michael Brown',
    comment: '"The trainers here push you to be your best while keeping you motivated. Every session feels like a step closer to my dream transformation."',
    image: 'https://i.pinimg.com/736x/8d/db/44/8ddb4443dd4716229c2a27aaa5c9ed3d.jpg',
  },
];

const Testimonials = () => {
  return (
    <div className="w-full py-16 px-8 rounded-2xl shadow-lg">
      {/* Heading */}
      <div className="leading-loose text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
        <p className="text-gray-500">Trusted by Many, Proven by Results – Hear from Our Community</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side - Testimonials */}
        <div className="w-full md:w-[70%] space-y-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-100 p-4 rounded-lg space-y-3"
            >
              {/* Profile + Name */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h4 className="font-semibold text-lg text-gray-800">{testimonial.name}</h4>
              </div>

              {/* Comment */}
              <div className="p-2 rounded-md text-gray-600">
                {testimonial.comment}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full md:w-[30%]">
          <img
            src="https://i.pinimg.com/736x/33/4f/ec/334fecd0cf3445feb15d03923e642662.jpg"
            alt="Happy Clients"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
