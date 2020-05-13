import React from 'react';
import { Container, List, Header, Loader, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantTable from '../components/RestaurantTable';
import RestaurantApprove from '../components/RestaurantApprove';

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
            {this.props.restaurantsApproval.map((restaurants, index) => <RestaurantApprove
                key={index} restaurants={restaurants}/>)}
          </div>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Admin.propTypes = {
  restaurants: PropTypes.array.isRequired,
  restaurantsApproval: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Menu documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurant.find({ approved: true }).fetch(),
    restaurantsApproval: Restaurant.find({ approved: false }).fetch(),
    ready: subscription.ready(),
  };
})(Admin);
