import React, { useEffect, useState } from 'react';
import Subscription from './Subscription';
import ProductShowcase from './ProductShowcase';
import Diet from './MemberDietPlan';
import MembershipDetails from './MembershipDetails';
import CallToAction from '../user/CallToAction';
import UserDetailsPopup from './UserDetailsPopup';

const Home = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const handleNewOrderNotification = () => {
    setNotificationCount((prev) => prev + 1);
  };

  return (
    <div>
    <UserDetailsPopup />
    <MembershipDetails />
    <Subscription />
    <ProductShowcase onNewOrderNotification={handleNewOrderNotification} />
    <Diet />
    <CallToAction />
    </div>
  );
};

export default Home;
