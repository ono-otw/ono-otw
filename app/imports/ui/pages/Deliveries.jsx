import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Segment, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { PastOrder } from '../../api/pastorder/PastOrder';
import DeliveryItem from '../components/DeliveryItem';

class Deliveries extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {

    const accepted = AcceptedOrders.find({}).count();

    if (accepted === 0) {
      return (
          <Container>
            <Segment className='signin-form'>
              <Segment textAlign={'center'}>
                <Header textAlign='center' as='h1'>Accepted Orders</Header>
                  <p>Currently you have no accepted orders.</p>
                  <Link to="/accept">Accept an order here!</Link>
              </Segment>
            </Segment>
          </Container>
      );
    }

    const currentOwner = Meteor.user().username;
    const ownerOrders = _.filter(this.props.orders, (entry) => entry.owner === currentOwner);
    return (
        <Container>
          <Segment className='signin-form'>
            <Segment>
              <Header textAlign='center' as='h1'>Accepted Orders</Header>
              <Item.Group divided>
                {ownerOrders.map((p, index) => <DeliveryItem key={index} order={p}/>)}
              </Item.Group>
            </Segment>
          </Segment>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Deliveries.propTypes = {
  orders: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('AcceptedOrders');
  const subscription2 = Meteor.subscribe('Profile');
  return {
    orders: AcceptedOrders.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(Deliveries);
