import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Jumbotron from '../components/Landing/Jumbotron';
import OrderDeliverSection from '../components/Landing/OrderDeliverSection';
import DetailsSection from '../components/Landing/DetailsSection';
import MobileSection from '../components/Landing/MobileSection';

const Landing = () => {
  return (
    <div>
      <Jumbotron />
      <OrderDeliverSection />
      <DetailsSection />
      <MobileSection />
    </div>
  );
}


export default Landing;