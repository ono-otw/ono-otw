import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantCard from '../components/RestaurantCard';


/** Renders the list of LandingRestaurant */
class LandingRestaurant extends React.Component {


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {


    const messagePad = {
      paddingTop: '1rem',
      paddingRight: '8rem',
      paddingLeft: '8rem',
      paddingBottom: '3rem',
    };

    return (
        <Container>
          <div style={messagePad}>
            <Message className='restaurant-message'>
              <div align={'center'}>
                <Message.Header>Some personal favorites...</Message.Header>
              </div>
            </Message>
          </div>
          <Card.Group itemsPerRow='4' centered>
            {this.props.restaurant.map((restaurant, index) => <
                RestaurantCard key={index} restaurant={restaurant}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of LandingRestaurant documents in the props. */
LandingRestaurant.propTypes = {
  restaurant: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  // Get access to Restaurant documents.
  const subscription = Meteor.subscribe('Restaurant');
  // Get access to Favorite documents.
  const subscription1 = Meteor.subscribe('Favorites');

  return {
    restaurant: Restaurant.find({ approved: true }, { limit: 4 }).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(LandingRestaurant);
