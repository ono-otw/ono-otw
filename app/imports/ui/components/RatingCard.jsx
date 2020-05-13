import React from 'react';
import { Item, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Profile } from '../../api/profile/Profile';
import { Ratings } from '../../api/ratings/Ratings';
import { PastOrder } from '../../api/pastorder/PastOrder';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RatingCard extends React.Component {

  state = {};

  getOwner = () => this.props.torate.deliverer;

  handleRate = (e, { rating }) => this.setState({ rating },
          () => {
            const owner = this.getOwner();
            Ratings.insert({ owner, rating });
          });

  updateHasRated(pastOrderID, profileID) {
    // PastOrder.update(
    //     { _id: pastOrderID },
    //     {
    //       $set: {
    //         hasRated: true,
    //       },
    //     },
    // );

    const userRate = Ratings.find({ owner: this.props.torate.deliverer });
    const count = Ratings.find({ owner: this.props.torate.deliverer }).count();
    const rateArray = [];
    userRate.forEach(function (order) {
      // console.log(order.rating);
      rateArray.push(order.rating);
    })

    let updatedRating = 0;
    if (count === 0) {
      updatedRating = 1;
    } else {
      updatedRating = _.reduce(rateArray, (total, current) => (current + total), 0) / count;
    }

    console.log(updatedRating);

    const newRating = Math.ceil(updatedRating);
    console.log(newRating);

    Profile.update(
        { _id: profileID },
        {
          $set: {
            rating: newRating,
          },
        },
    );
  }

  /** Render the page once subscriptions have been received. */
  render() {

    const personToRate = Profile.findOne({ owner: this.props.torate.deliverer });

    return (
        <Item>
          <Item.Image src = { personToRate.image }/>
          <Item.Content>
            <Item.Header>{personToRate.firstName} {personToRate.lastName} </Item.Header>
            <Item.Meta>
              <Rating icon='star' disabled defaultRating={personToRate.rating} maxRating={5} />
              <br/>
              <span className='stay'> {this.props.torate.weekday},</span>
              <span className='stay'>{this.props.torate.month}</span>
              <span className='stay'>{this.props.torate.day}</span>
            </Item.Meta>
            <Item.Description>Delivered from: {this.props.torate.store}</Item.Description>
            <Item.Description> Please rate their service: </Item.Description>
            <Item.Description>
              <Rating icon='star'
                      defaultRating={0}
                      maxRating={5}
                      onRate={this.handleRate}
                      onClick={() => this.updateHasRated(this.props.torate._id, personToRate._id)}
              />
            </Item.Description>
          </Item.Content>
        </Item>
  );
}
}

/** Require an array of Stuff documents in the props. */
RatingCard.propTypes = {
  torate: PropTypes.array.isRequired,
};

export default RatingCard;
