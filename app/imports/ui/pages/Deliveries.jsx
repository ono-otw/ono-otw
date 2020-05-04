import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Segment, Item, Popup, Rating, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AcceptOrders } from '../../api/acceptorders/AcceptOrders';
import DeliveryItem from '../components/DeliveryItem';

class Deliveries extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {

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


          <Segment className='signin-form'>
            <Segment>
              <Header textAlign='center' as='h1'>Delivered Orders</Header>
              <Item.Group divided>
                <Item>
                  <Popup
                      trigger={
                        <Item.Image
                            size='small'
                            src='https://bit.ly/3d6pGoy'/>
                      }
                  ><Popup.Header>Rating</Popup.Header>
                    <Popup.Content> <Rating icon='star' defaultRating={4} maxRating={5} disabled/></Popup.Content>
                  </Popup>
                  <Item.Content>
                    <Item.Header>John Foo</Item.Header>
                    <Item.Description>Venmo</Item.Description>
                    <Item.Description>User Location</Item.Description>
                    <Item.Description>Order</Item.Description>
                  </Item.Content>
                </Item>

                <Item>
                  <Popup
                      trigger={
                        <Item.Image
                            size='small'
                            src='https://cammoore.github.io/images/cam-moore.jpg'/>
                      }
                  ><Popup.Header>Rating</Popup.Header>
                    <Popup.Content> <Rating icon='star' defaultRating={4} maxRating={5} disabled/></Popup.Content>
                  </Popup>
                  <Item.Content>
                    <Item.Header>Cam Moore</Item.Header>
                    <Item.Description>Venmo</Item.Description>
                    <Item.Description>User Location</Item.Description>
                    <Item.Description>Order</Item.Description>
                  </Item.Content>
                </Item>
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
  const subscription = Meteor.subscribe('AcceptOrders');
  const subscription2 = Meteor.subscribe('Profile');
  return {
    orders: AcceptOrders.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(Deliveries);