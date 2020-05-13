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

  updateProfileRate = () => {
    const userRate = Ratings.find({ owner: this.props.torate.deliverer });
    const count = Ratings.find({ owner: this.props.torate.deliverer }).count();
    const rateArray = [];
    userRate.forEach(function (order) {
      // console.log(order.rating);
      rateArray.push(order.rating);
    });

    let updatedRating = 0;
    if (count === 0) {
      updatedRating = 0;
    } else {
      updatedRating = _.reduce(rateArray, (total, current) => (current + total), 0) / count;
    }
    const newRating = Math.ceil(updatedRating);
    console.log(newRating);
    return newRating;
  };

  handleRate = (e, { rating }) => this.setState({ rating },
          () => {
            const owner = this.getOwner();
            Ratings.insert({ owner, rating });

            const newRating = this.updateProfileRate();
            const personToRate = Profile.findOne({ owner: owner });

            Profile.update(
                { _id: personToRate._id },
                {
                  $set: {
                    rating: newRating,
                  },
                },
            );

            PastOrder.update(
                { _id: this.props.torate._id },
                {
                  $set: {
                    hasRated: true,
                  },
                },
            );

          });


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
