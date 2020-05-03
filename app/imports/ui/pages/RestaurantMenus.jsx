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

    const restaurantOwner = this.props.restaurant.owner;
    // console.log(restaurantOwner);
    // console.log(this.props.menuitems);
    const menuItems = _.filter(this.props.menuitems, (entry) => entry.owner === restaurantOwner);
    const { activeItem } = this.state;
    return (
        <div>
          <div className='menuimage'><img src={this.props.restaurant.bgimg}/></div>

          <Container>
            <div align='center'>
              <Header style={{ marginTop: '30px', fontSize: '40px' }}>{this.props.restaurant.name}</Header>
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
                 {menuItems.map((menuitem, index) => <MenuitemCard key={index} menuitem={menuitem}/>)}
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
  menuitems: PropTypes.array,
  restaurant: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription1 = Meteor.subscribe('MenuItems');
  const subscription2 = Meteor.subscribe('Restaurant');
  // const restaurant = Restaurant.find({ _id: documentId }).fetch();

  return {
    // menuitems: MenuItems.find({ owner: restaurant[0].owner }).fetch(),
    restaurant: Restaurant.findOne(documentId),
    menuitems: MenuItems.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(RestaurantMenus);
