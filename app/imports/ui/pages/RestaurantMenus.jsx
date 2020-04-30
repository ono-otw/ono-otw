import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Input, Header, Menu, Loader, Card, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { MenuItems } from '../../api/foodmenu/MenuItems';
import { Restaurant } from '../../api/restaurant/Restaurant';
import MenuitemCard from '../components/MenuItems/MenuitemCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RestaurantMenus extends React.Component {

  state = { activeItem: 'Coffee' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activeItem } = this.state;

    return (
        <div>
          <div className='menuimage'><img src='https://bit.ly/2wV9ozB'/></div>

          <Container>
            <div align='center'>
              <Header style={{ marginTop: '30px', fontSize: '40px' }}>Starbucks</Header>
              <div className='menu_search_bar'><Input size='large' icon='search'
                                                      placeholder='Search for a menu item'/></div>
              <Menu secondary className='menubartext'>
                <Menu.Item className='menu_categories' name='Coffee'
                           active={activeItem === 'Coffee'} onClick={this.handleItemClick}/>
                <Menu.Item name='Tea' active={activeItem === 'Tea'} onClick={this.handleItemClick}/>
                <Menu.Item name='Pastries' active={activeItem === 'Pastries'}
                           onClick={this.handleItemClick}/>
                <Menu.Item name='Sandwiches' active={activeItem === 'Sandwiches'}
                           onClick={this.handleItemClick}/>
              </Menu>

              <hr style={{ borderTop: '2px solid #184470' }}/>

              <Card.Group>
                {this.props.menuitems.map((menuitem, index) => <MenuitemCard key={index} menuitem={menuitem}/>)}
              </Card.Group>
              <div style={{ padding: '50px' }}><Button className='dark-blue-button'>Show More</Button></div>
            </div>

          </Container>
        </div>

    );
  }
}

/** Require an array of Stuff documents in the props. */
RestaurantMenus.propTypes = {
  menuitems: PropTypes.array.isRequired,
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription1 = Meteor.subscribe('AllMenuItems');
  const subscription2 = Meteor.subscribe('Restaurant');
  const documentId = match.params._id;
  console.log(documentId);

  const restaurant = Restaurant.find({ _id: documentId }).fetch();
  console.log(restaurant);

  // if (undefined === restaurant[0]) {
  //   restaurant[0] = {
  //     owner: 'starbucks@foo.com',
  //     name: 'Starbucks',
  //     address: '2465 Campus Rd #220',
  //     image: 'https://assets.change.org/photos/7/ou/zi/OlOuziNRVcXqzpX-800x450-noPad.jpg?1531499872',
  //     rating: 4.1,
  //     time: 8,
  //     label: ['Coffee', 'Tea'],
  //     approved: true,
  //   };
  // }
  // console.log(restaurant[0]);

  return {
    menuitems: MenuItems.find({ owner: restaurant[0].owner }).fetch(),
    restaurants: Restaurant.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(RestaurantMenus);
