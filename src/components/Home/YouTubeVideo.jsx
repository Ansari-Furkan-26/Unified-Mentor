import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const YouTubeVideo = () => {
  const videos = [
    "https://www.youtube.com/embed/V1Pl8CzNzCw?si=VWDY_cpAxE06Sy_u",
    "https://www.youtube.com/embed/Jyst8oIHOAY?si=jM07cfi85EZESGMu",
    "https://www.youtube.com/embed/XO8wew38VM8?si=7s2jTYFsioXkKJEv",
    "https://www.youtube.com/embed/uBaqgt5V0mU?si=GXje-l2QuD5YpB8T" 
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-16 pb-4 min-h-full text-white">
      <div className='flex items-center justify-between mb-6'>
        <h1 className="text-2xl text-gray-200 font-bold">Music videos for you</h1>
        <div className='flex gap-2'>
          <button 
            onClick={() => scroll('left')}
            className="py-1 px-0.5 rounded-full shadow-md border-1 hover:bg-gray-900"
          >
            <ChevronLeft className="text-white h-5 " />
          </button>

          <button 
            onClick={() => scroll('right')}
            className="py-1 px-0.5 rounded-full shadow-md border-1 hover:bg-gray-900"
          >
            <ChevronRight className="text-white h-5" />
          </button>
        </div>
      </div>

      <div className="relative ">        
        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto hide-scrollbar">
          {videos.map((video, index) => (
            <div key={index} className="min-w-[300px] max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800">
              <iframe
                className="w-full h-48"
                src={video}
                title={`YouTube video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideo;
