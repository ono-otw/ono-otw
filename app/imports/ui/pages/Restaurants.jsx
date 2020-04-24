import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Search, Icon, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import RestaurantCard from '../components/RestaurantCard';

/* Used to render search results. Atm the required fields for search using native semantic UI:
* Title, Image, Description, Price
* Will have figure out how to modify to read from database or change native search names from
* semantic ui.
*/

const restaurantSearch = [{
  title: 'Raising Canes', description: '2615 S King St Unit 102',
  image: 'https://tinyurl.com/y7adk236',
  time: '15min', price: '4.5', label: ['Chicken'],
},
  {
    title: 'Bale', description: '2465 Campus Rd #220',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/n3jOrjcJOVoz0npBf_FS1Q/o.jpg',
    time: '10min', price: '4.1', label: ['Sandwich', 'Pho'],
  },
  {
    title: 'Shaka Shaka', description: '2600 S King St.',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Uynrx7WT2hkJV8WSDVYfWg/o.jpg',
    time: '25min', price: '3.2', label: ['Smoothie', 'Tea'],
  },
];

const initialState = { isLoading: false, results: [], value: '' };
/** Renders the list of restaurants */
class Restaurants extends React.Component {

  restaurants = [{
    name: 'Raising Canes', address: '2615 S King St Unit 102',
    image: 'https://tinyurl.com/y7adk236',
    time: '15min', rating: '4.5', label: ['Chicken'],
     },
    {
      name: 'Bale', address: '2465 Campus Rd #220',
      image: 'https://s3-media0.fl.yelpcdn.com/bphoto/n3jOrjcJOVoz0npBf_FS1Q/o.jpg',
      time: '10min', rating: '4.1', label: ['Sandwich', 'Pho'],
    },
    {
      name: 'Shaka Shaka', address: '2600 S King St.',
      image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Uynrx7WT2hkJV8WSDVYfWg/o.jpg',
      time: '25min', rating: '3.2', label: ['Smoothie', 'Tea'],
    },
  ];

  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.label);

      this.setState({
        isLoading: false,
        results: _.filter(restaurantSearch, isMatch),
      });
    }, 300);
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

    const { isLoading, value, results } = this.state;

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
                {this.restaurants.map((restaurants, index) => <RestaurantCard key={index} restaurants={restaurants}/>)}
            </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Restaurants.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Restaurants);