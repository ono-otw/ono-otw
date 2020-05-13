import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PastOrder } from '../../api/pastorder/PastOrder';
import RatingCard from '../components/RatingCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Rating extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {


    return (
        <Container>
          <Segment className='signin-form'>
            <Segment>
              <Header textAlign='center' as='h1'>Ratings</Header>
              <Item.Group divided>
                {this.props.torate.map((torate, index) => <RatingCard key={index} torate={torate}/>)}
              </Item.Group>
            </Segment>
          </Segment>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Rating.propTypes = {
  torate: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe('PastOrder');
  const sub2 = Meteor.subscribe('Ratings');
  const sub3 = Meteor.subscribe('Profile');
  return {
    torate: PastOrder.find({ hasRated: false }).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(Rating);
