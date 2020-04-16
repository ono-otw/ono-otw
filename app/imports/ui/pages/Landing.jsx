import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Jumbotron from '../components/Landing/Jumbotron'
import Options from '../components/Landing/Options'
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid>
          <Grid.Row>
            <Jumbotron />
          </Grid.Row>
          <Grid.Row>
            <Options />
          </Grid.Row>
        </Grid>
    );
  }
}

export default Landing;
