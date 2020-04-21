import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Input, Header, Menu, Loader, Card, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItem from '../components/StuffItem';
import MenuitemCard from '../components/MenuitemCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FoodMenu extends React.Component {

  menuItems = [{
    name: 'White Mocha', calories: 240,
    image: 'https://bit.ly/2VrKeSF',
    size: 16, price: 4.45,
  },
    {
      name: 'Flat White', calories: 170,
      image: 'https://bit.ly/3cyLBo3',
      size: 12, price: 5.45,
    },
    {
      name: 'Americano', calories: 170,
      image: 'https://bit.ly/2Vo0Ryn',
      size: 12, price: 5.45,
    },
  ];

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
          {/* <Image fluid src={'/images/starbucks.jpg'}/> */}
          <div className='menuimage'><img src='https://bit.ly/2wV9ozB'/></div>

          <Container>
            <div align='center'>
              <Header style={{ marginTop: '30px', fontSize: '40px' }}>Starbucks</Header>
              <div className='menu_search_bar'><Input size='large' icon='search'
                                                      placeholder='Search for a menu item'/></div>
              <Menu secondary className='menubartext'>
                <Menu.Item name='Coffee' active={activeItem === 'Coffee'} onClick={this.handleItemClick}/>
                <Menu.Item name='Tea' active={activeItem === 'Tea'} onClick={this.handleItemClick}/>
                <Menu.Item name='Pastries' active={activeItem === 'Pastries'}
                           onClick={this.handleItemClick}/>
                <Menu.Item name='Sandwiches' active={activeItem === 'Sandwiches'}
                           onClick={this.handleItemClick}/>
              </Menu>

              <hr style={{ borderTop: '2px solid #184470' }}/>
              <Card.Group>
                {/* <Card className='card-bg'> */}
                {/*  <Grid columns={2}> */}
                {/*    <Grid.Column> */}
                {/*      <Image */}
                {/*          rounded */}
                {/*          floated='left' */}
                {/*          size='medium' */}
                {/*          src='https://bit.ly/2VGp029' */}
                {/*      /> */}
                {/*    </Grid.Column> */}
                {/*    <Grid.Column> */}
                {/*      <Card.Header style={cardHeader}>Flat White</Card.Header> */}
                {/*      <Card.Description> */}
                {/*        240 Cal<br/> */}
                {/*        16 oz<br/> */}
                {/*        $4.45<br/> */}
                {/*      </Card.Description> */}

                {/*    </Grid.Column> */}
                {/*  </Grid> */}
                {/* </Card> */}
                {this.menuItems.map((menuitem, index) => <MenuitemCard key={index} menuitem={menuitem}/>)}
              </Card.Group>
              <div className='buttonspacing'><Button className='show-more-button'>Show More</Button></div>
            </div>

          </Container>
        </div>

    );
  }
}

/** Require an array of Stuff documents in the props. */
FoodMenu.propTypes = {
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
})(FoodMenu);
