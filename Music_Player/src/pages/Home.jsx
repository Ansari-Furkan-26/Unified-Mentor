import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Banner from '../components/Home/Banner';
import SongList from '../components/Home/SongList';
import Footer from '../components/Footer';
import ArtistPreferenceForm from '../components/Home/ArtistPreferenceForm';
import YouTubeVideo from '../components/Home/YouTubeVideo';

function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow bg-[#0A0A0A]">
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            {/* Home Page */}
            <div className="overflow-hide h-full">
              <Banner />
              <SongList />
              <ArtistPreferenceForm />
              <YouTubeVideo />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Home;