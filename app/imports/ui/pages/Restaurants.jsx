import React, { useState } from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Search, Icon, Header, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantCard from '../components/RestaurantCard';

/** Renders the list of restaurants */
const Restaurants = props => {
  const searchBar = {
    paddingBottom: '5rem',
    paddingTop: '2rem',
  };

  const messagePad = {
    paddingTop: '1rem',
    paddingRight: '8rem',
    paddingLeft: '8rem',
  };

    const _restaurant = [];
    const [userInput, setUserInput] = useState("");
    const [resturantFilter, setResturantFilter] = useState([]);

    for (let i = 0; i < props.restaurant.length; i++) { _restaurant.push(props.restaurant[i].name.toLowerCase()); }

    const handleUserInput = () => {
      const { value } =  event.target;
      setUserInput(value);
      setResturantFilter(() => _restaurant.filter(name => name.includes(userInput)));
    }
    console.log(resturantFilter)
    return (
        <Container>
          <div align='center'>
            <Header as='h2' inverted>
              <Header.Content>
                List of Restaurants
                <Icon name='food'/>
              </Header.Content>
            </Header>
          </div>
          <div style={messagePad}>
            <Message className='restaurant-message'>
              <Message.Header>To Search....</Message.Header>
              <Message.List>
                <Message.Item>Search by food category</Message.Item>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Message.Item>Clicking on Restaurant's title will bring you to the menu page. </Message.Item>
              </Message.List>
            </Message>
          </div>
          <div align='center' style={searchBar}>
            <Search className='search_bar'
                    input={{ icon: 'search', iconPosition: 'left' }}
                    // loading={isLoading}
                    // onResultSelect={handleResultSelect}
                    // onSearchChange={_.debounce(handleSearchChange, 500, {
                    //   leading: 'true',
                    // })}
                    results={resturantFilter}
                    // value={value}
                    {...props}
                    onSearchChange={handleUserInput}
                    value={userInput}
            />
          </div>
            <Card.Group itemsPerRow='4' centered className='restaurant_card'>
                {props.restaurant.map((restaurant, index) => <RestaurantCard key={index} restaurant={restaurant}/>)}
            </Card.Group>
        </Container>
    );
  }

/** Require an array of Stuff documents in the props. */
Restaurants.propTypes = {
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
    restaurant: Restaurant.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(Restaurants);
