import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Jumbotron from '../components/Landing/Jumbotron'
import Options from '../components/Landing/Options'
import BrowseFood from '../components/Landing/BrowseFood'

class Landing extends React.Component {
  render() {
    return (
        <Grid>
            <Jumbotron />
            <Options />
            <BrowseFood />
        </Grid>
    );
  }
}

export default Landing;
