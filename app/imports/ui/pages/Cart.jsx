import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Header, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Carts } from '../../api/cart/Carts';
import CartTable from '../components/CartTable';
/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Cart extends React.Component {

  confirm() {
    const owner = this.props.cartItems.owner;
    const itemId = this.props.cartItems._id;
    const vendor = this.props.cartItems.vendor;
    const initialPrice = this.props.cartItems.reduce((total, current) => total + (current.price * current.quantity), 0);
    const tax = (initialPrice * 0.045).toFixed(2);
    const deliveryPrice = (2.50).toFixed(2);
    const totalPrice = (+initialPrice + +tax + +deliveryPrice).toFixed(2);
    Orders.insert({
          owner,
          vendor,
          totalPrice,
          itemId,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Order has been confirmed!', 'success');
            Carts.remove(Carts.findOne({ MenuId: this.props.cartItems._id })._id);
            this.forceUpdate();
          }
        });
  }

  cancel() {
    swal({
      title: 'Are you sure?',
      text: 'It will disappear from your Favorites page, but you can re-favorite at any time in the Food Options page!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Carts.remove(Carts.findOne({ MenuId: this.props.cartItems._id })._id);
            this.forceUpdate();
            swal('This order has been cancelled!', {
              icon: 'success',
            });
          } else {
            swal('Order is not cancelled!');
          }
        });
  }

  /** Render the Cart form. */
  render() {

    const padding = {
      margin: '0.3rem',
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

    const initialPrice = this.props.cartItems.reduce((total, current) => total + (current.price * current.quantity), 0);
    const tax = (initialPrice * 0.045).toFixed(2);
    const deliveryPrice = (2.50).toFixed(2);
    const totalPrice = (+initialPrice + +tax + +deliveryPrice).toFixed(2);

    return (
        <Container style={blueContainer}>
          <div style={innerContainer}>
            <Header as='h1' style={padding}>Order</Header>
            <hr className='blackBorder'/>
            {this.props.cartItems.map((cartItems, index) => <CartTable key={index} cartItems={cartItems}/>)}

            <hr className='blackBorder'/>
            <Grid columns='2' style={padding}>
              <Grid.Column>
                <Header as='h3'>Tax</Header>
                <Header as='h3'>Delivery Fee</Header>
                <Header as='h2'>Total</Header>

              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h3'>
                  {tax}
                </Header>
                <Header as='h3'>
                  {deliveryPrice}
                </Header>
                <Header as='h2'>
                  {totalPrice}
                </Header>
              </Grid.Column>
            </Grid>
          </div>
          <Form>
            <Form.Group inline>
              <Form.Button className='cancel_button' onClick={() => this.cancel()}>
                Cancel
              </Form.Button>
              <Form.Button inverted className='submit_button' onClick={() => this.confirm()}>
                Confirm
              </Form.Button>
            </Form.Group>
          </Form>
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
