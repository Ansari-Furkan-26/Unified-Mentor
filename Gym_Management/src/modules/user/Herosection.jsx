import SearchEngine from '../../components/header/Search';
import { CiLocationArrow1  } from 'react-icons/ci';

const HeroSection = () => {

  return (
    <div className="w-full p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-">
        {/* Left Section - 60% */}
        <div className="w-full md:w-[60%] text-left">
          <h1 className="text-5xl md:text-8xl pl-0 md:pl-14 uppercase font-bold text-gray-900">
            Make You <br /> from Zero <br /> to Hero.
          </h1>
        </div>

        {/* Right Section - 40% */}
        <div className="w-full md:w-[40%] space-y-6">
          <SearchEngine />

          <p className="text-gray-700 text-base leading-relaxed">
            Success doesn't happen overnight. It takes dedication, perseverance, and hard work. 
            Your journey to greatness starts with a single step. Keep pushing forward, 
            and you'll achieve things beyond your imagination.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              <img src="https://i.pinimg.com/736x/92/e6/25/92e62501bd4a6db3cf3c7aaf04025b36.jpg" alt="user1" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pinimg.com/736x/fc/87/25/fc872553b9b9f488d43e6756dfcb8ff3.jpg" alt="user2" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pinimg.com/736x/8c/99/c8/8c99c8b9c88736ebc41800c3502b787b.jpg" alt="user3" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pinimg.com/736x/58/11/f6/5811f6c2609111a62cdccd1e93a39e4a.jpg" alt="user4" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pinimg.com/736x/90/10/bf/9010bfce72ad55d9fb746b0b9252e1a6.jpg" alt="user5" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
            </div>

            <p className="text-gray-900 text-sm">
              We have achieved 100+ <br /> members on our platform.
            </p>
          </div>

          <a href='https://www.instagram.com/furqan_.26/' target='_blank' className="py-6 flex">
            Connect With Us <CiLocationArrow1  className='ml-2 h-7 w-7 rotate-45 '/>
          </a>
        </div>
      </div>

      {/* Full-width Image */}
      <div className="w-full rounded-3xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Hero Background" 
          className="w-full h-60 md:h-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
