import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Header } from 'semantic-ui-react';
import { Carts } from '../../api/cart/Carts';
import CartTable from '../components/CartTable';
/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Cart extends React.Component {

  /** Render the Cart form. */
  render() {

    const paddingDiv = {
      paddingRight: '3rem',
    };

    const blueContainer = {
      marginTop: '5rem',
      paddingBottom: '1rem',
      backgroundColor: '#D3E3FC',
      borderRadius: '20px',
      paddingTop: '1rem',
    };

    const innerContainer = {
      margin: '1rem',
      backgroundColor: 'white',
      borderRadius: '20px',
    };

    return (
        <Container style={blueContainer}>
          <div style={innerContainer}>
            <Header>Order</Header>
            <hr className='blackBorder'/>
            {this.props.cartItems.map((cartItems, index) => <CartTable key={index} cartItems={cartItems}/>)}

            <hr className='blackBorder'/>
            <Grid columns='2'>
              <Grid.Column>
                <Header as='h4'>Tax</Header>
                <Header as='h4'>Delivery Fee</Header>

              </Grid.Column>
              <Grid.Column textAlign='right'>
                <div>

                </div>

              </Grid.Column>
            </Grid>
          </div>
         </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Carts');
  return {
    cartItems: Carts.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Cart);
