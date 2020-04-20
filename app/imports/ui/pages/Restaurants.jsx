import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Search, Icon, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import RestaurantCard from '../components/RestaurantCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Restaurants extends React.Component {

  restaurants = [{
    name: 'Raising Canes', address: '2615 S King St Unit 102',
    image: 'https://raster-static.postmates.com/?url=com.postmates.img.prod.s3.amazonaws.com/b657a2f8-9549-45fa-a0c7-6826f23ef6bd/orig.jpg&quality=90&w=1500&h=900&mode=crop&format=jpg&v=4',
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
      time: '25min', rating: '3.2', label: ['Smoothie'],
    },
  ];

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
    const buttonCol = {
      backgroundColor: '#184470',
      color: 'white',
  };
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
            />
          </div>
            <Card.Group itemsPerRow='4' centered className='restaurant_card'>
                {this.restaurants.map((restaurants, index) => <RestaurantCard key={index} restaurants={restaurants}/>)}
            </Card.Group>

          <div align='center'>
            <Button style={buttonCol}>
              Load More
            </Button>
          </div>

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
