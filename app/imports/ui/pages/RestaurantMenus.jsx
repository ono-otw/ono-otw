import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Input, Header, Menu, Loader, Card, Message, Modal, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { MenuItems } from '../../api/foodmenu/MenuItems';
import { Restaurant } from '../../api/restaurant/Restaurant';
import MenuitemCard from '../components/MenuItems/MenuitemCard';
import Cart from './Cart';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RestaurantMenus extends React.Component {

  state = { activeItem: 'All' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  display(tabName) {
    const restaurantOwner = this.props.restaurant.owner;
    // console.log(restaurantOwner);
    // console.log(this.props.menuitems);
    const menuItems = _.filter(this.props.menuitems, (entry) => entry.owner === restaurantOwner);
    const categories = _.where(menuItems, { label: tabName });
    if (tabName === 'All') {
      return (
          <Card.Group>
            {menuItems.map((p, index) => <MenuitemCard key={index} menuitem={p}/>)}
          </Card.Group>
      );
    }
    // console.log(categories)
    // console.log(tabName)
    // console.log('Yes coffee')

    return (
        <Card.Group>
          {categories.map((p, index) => <MenuitemCard key={index} menuitem={p}/>)}
        </Card.Group>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const restaurantOwner = this.props.restaurant.owner;
    // console.log(restaurantOwner);
    // console.log(this.props.menuitems);
    const menuItems = _.filter(this.props.menuitems, (entry) => entry.owner === restaurantOwner);

    const categories = _.uniq(_.pluck(menuItems, 'label'));

    const { activeItem } = this.state;
    // console.log(this.state.activeItem);

    return (
        <div>
          <div className='menuimage'>
            <img style={{ height: '200px' }} src={this.props.restaurant.bgimg}/>
          </div>

          <Container>
            <div align='center'>
              <Header inverted style={{ fontFamily: 'Karla, sans-serif', marginTop: '30px', fontSize: '40px' }}>
                {this.props.restaurant.name}
              </Header>
              <div className='menu_search_bar'><Input size='large' icon='search'
                                                      placeholder='Search for a menu item'/></div>
              <Menu secondary className='menubartext'>
                <Menu.Item active={activeItem === 'All'} name='All' onClick={this.handleItemClick}>All</Menu.Item>
                {_.map(categories, (p, index) => <Menu.Item
                    key={index}
                    name={p}
                    onClick={this.handleItemClick}
                    active={activeItem === p}>
                </Menu.Item>)}
              </Menu>

              <hr style={{ borderTop: '2px solid #184470' }}/>

              <Message className='restaurant-message'>
                <Message.Header>Click on the tabs to start looking!</Message.Header>
                Note: You can only order from the same restaurant! (Eg. Cannot mix Starbucks with Bale)
              </Message>

               {this.display(activeItem)}

              <div style={{ padding: '20px' }}>
              </div>
            </div>
            <div align={'center'}>
              <Modal
                  trigger={
                    <Button style={{ background: '#184470', color: 'white' }}>
                      Show Cart</Button>} closeIcon
                  style={{
                    background: 'transparent', border: '0',
                    boxShadow: '0px 0px 0px 0px rgba(34, 36, 38, 0.12), ' +
                        '0px 0px 0px 0px rgba(34, 36, 38, 0.15)',
                  }}
                  size={'small'}
              >
                <Cart/>
              </Modal>
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
