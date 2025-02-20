import React from 'react';
import About from "./About";
import Subscription from '../member/Subscription';
import ProductShowcase from '../member/ProductShowcase';
import Testimonial from './Testimonial';
import Footer from '../../components/header/Footer';
import CallToAction from './CallToAction';
import HeroSection from './Herosection';

const Index = () => {
  return (
    <div className='mt-14'>
      <HeroSection />
      <About />
      <Subscription />
      <ProductShowcase />
      <Testimonial />
      <CallToAction />
    </div>
  );
};

export default Index;
