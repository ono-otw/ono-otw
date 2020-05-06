import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Search, Icon, Header, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantCard from '../components/RestaurantCard';

/* Used to render search results. Atm the required fields for search using native semantic UI:
* Title, Image, Description, Price
* Will have figure out how to modify to read from database or change native search names from
* semantic ui.
*/


// const restaurantSearch = [{
//   title: 'Raising Canes', description: '2615 S King St Unit 102',
//   image: 'https://tinyurl.com/y7adk236',
//   time: '15min', price: '4.5', label: ['Chicken'],
// },
//   {
//     title: 'Bale', description: '2465 Campus Rd #220',
//     image: 'https://s3-media0.fl.yelpcdn.com/bphoto/n3jOrjcJOVoz0npBf_FS1Q/o.jpg',
//     time: '10min', price: '4.1', label: ['Sandwich', 'Pho'],
//   },
//   {
//     title: 'Starbucks', description: '2465 Campus Rd #220.',
//     image: 'https://assets.change.org/photos/7/ou/zi/OlOuziNRVcXqzpX-800x450-noPad.jpg?1531499872',
//     time: '8min', price: '4.5', label: ['Coffee', 'Tea'],
//   },
// ];

const initialState = { isLoading: false, results: [], value: '' };
/** Renders the list of restaurants */
class Restaurants extends React.Component {

  searchOptions = () => {
    return _.map(this.props.restaurant, function (document) { return { title: document.name, description: document.address, image: document.bgimg, time: document.time, price: document.rating, label: document.label }; });
  };

  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(this.searchOptions, isMatch),
      });
    }, 300);
    console.log(this.searchOptions());
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const searchBar = {
      paddingBottom: '5rem',
      paddingTop: '2rem',
    };

    const messagePad = {
      paddingTop: '1rem',
      paddingRight: '8rem',
      paddingLeft: '8rem',
    };

    const { isLoading, value, results } = this.state;
    console.log(results);
    console.log(value);

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
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: 'true',
                    })}
                    results={results}
                    value={value}
                    {...this.props}
            />
          </div>
            <Card.Group itemsPerRow='4' centered className='restaurant_card'>
                {this.props.restaurant.map((restaurant, index) => <RestaurantCard key={index} restaurant={restaurant}/>)}
            </Card.Group>
        </Container>
    );
  }
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
