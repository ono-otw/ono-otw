import React from 'react';
import { Container, List, Header, Loader, Button, Grid, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import StuffItemAdmin from '../components/StuffItemAdmin';
import { Stuffs } from '../../api/stuff/Stuff';
import { Restaurant } from '../../api/restaurant/Restaurant';
import StuffItem from '../components/StuffItem';
import RestaurantTable from '../components/RestaurantTable';

class Admin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
       return (
        <Container>
          <div className='admin-block'>
            <Header as='h1'>Current Restaurants</Header>
            <hr className='blackBorder'/>
            {this.props.restaurants.map((restaurants, index) => <RestaurantTable
                key={index} restaurants={restaurants}/>)}

            <Header as='h1' style={{ marginTop: '50px' }}>Requests</Header>
            <hr className='blackBorder'/>
            <List>
              <Grid columns={5}>
                <Grid.Column><Header as='h3'>Raising Canes</Header></Grid.Column>
                <Grid.Column>View</Grid.Column>
                <Grid.Column>
                  <Button className='accept'>Accept</Button>
                  <Button className='deny'>Deny</Button>
                </Grid.Column>
              </Grid>
            </List>
            <List>
            <Grid columns={5}>
              <Grid.Column><Header as='h3'>Shaka Shaka</Header></Grid.Column>
              <Grid.Column>View</Grid.Column>
              <Grid.Column>
                <Button className='accept'>Accept</Button>
                <Button className='deny'>Deny</Button>
              </Grid.Column>
            </Grid>
          </List>
          </div>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Admin.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Restaurant documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurant.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Admin);
