import React from 'react';
import Jumbotron from '../components/Landing/Jumbotron';
import OrderDeliverSection from '../components/Landing/OrderDeliverSection';
import DetailsSection from '../components/Landing/DetailsSection';
import LandingRestaurant from '../pages/LandingRestaurant';

const Landing = () => {
  return (
    <div>
      <Jumbotron />
      <OrderDeliverSection />
      <div style={ {paddingTop: '2rem'} }>
        <LandingRestaurant/>
      </div>
      <DetailsSection />
    </div>
  );
}


export default Landing;