const AboutUsSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-5" id="about">
      {/* About Us Text */}
      <div className="text-center mb-12">
        <p className="text-gray-900 font-bold text-2xl md:text-3xl uppercase tracking-wide max-w-7xl mx-auto leading-relaxed">
          We are dedicated to transforming lives through fitness. Our mission is to inspire,
          guide, and support you on your journey to becoming the best version of yourself.
        </p>
      </div>

      {/* Video & Improvement Section */}
      <div className="flex flex-col md:flex-row items-center gap-14 mt-0 md:mt-8 w-full max-w-6xl">
        {/* Video Section */}
        <div className="w-full md:w-1/2">
          <video 
            src="/video.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-72 object-cover rounded-3xl shadow-lg"
          ></video>
        </div>

        {/* Improvement Text Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-3xl font-semibold text-gray-900 uppercase">How We Help You Improve Yourself</h3>
          <p className="text-gray-700 text-base leading-relaxed">
            Our approach focuses on building sustainable habits, providing personalized guidance, and
            creating an environment where you can thrive. We believe that with the right mindset and tools,
            you can unlock your true potential and achieve long-lasting results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
