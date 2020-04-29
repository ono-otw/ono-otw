import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Card,
  Loader,
  Icon,
  Header,
  Message,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AcceptOrders } from '../../api/acceptorders/AcceptOrders';
import { Profile } from '../../api/profile/Profile';
import AcceptOrderCard from '../components/AcceptOrderCard';

/** Renders the list of AcceptOrders */
class AcceptOrder extends React.Component {


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
      paddingBottom: '5rem',
    };

    return (
        <Container>
          <div align='center'>
            <Header as='h2' inverted>
              <Header.Content>
                Current Orders
                <Icon name='food'/>
              </Header.Content>
            </Header>
          </div>
          <div style={messagePad}>
            <Message className='restaurant-message'>
              <Message.Header>To Accept an Order...</Message.Header>
              <Message.List>
                <Message.Item>Click on "Accept" to accept the order.</Message.Item>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Message.Item>Accepting the order will provide you with more information about it.</Message.Item>
              </Message.List>
            </Message>
          </div>
          <Card.Group className='accept_card' centered>
            {this.props.pendingOrder.map((pendingOrder, index) => <AcceptOrderCard key={index} pendingOrder={pendingOrder}/>)}

          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AcceptOrder.propTypes = {
  pendingOrder: PropTypes.array.isRequired,
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to AcceptOrder documents.
  const subscription = Meteor.subscribe('AcceptOrders');
  const subscription2 = Meteor.subscribe('Profile');
  return {
    pendingOrder: AcceptOrders.find({}).fetch(),
    profile: Profile.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(AcceptOrder);
