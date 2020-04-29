import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Header, Form, Message } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
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
    const personWhoOrdered = this.props.cartItems.owner;

    swal({
      title: 'Are you sure?',
      text: 'Submitting your order is final.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((yes) => {
          let total = this.props.total;
          if (yes) {
            while (total !== 0) {
              acceptOrder.insert({
                    personWhoOrdered,
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
              Carts.remove(Carts.findOne({ MenuId: this.props.cartItems._id })._id);
              console.log(total);
              total--;
            }
            this.forceUpdate();
            swal('This order has been cancelled!', {
              icon: 'success',
            });
          } else {
            swal('Order is not cancelled!');
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
          let total = this.props.total;
          if (willDelete) {
            while (total !== 0) {
              Carts.remove(Carts.findOne({ MenuId: this.props.cartItems._id })._id);
              // console.log(total)
              total--;
            }
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
      paddingTop: '1.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    };

    const HRMargin = {
      marginRight: '1.5rem',
      marginLeft: '1.5rem',
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
      paddingBottom: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '20px',
    };

    const buttonPadding = {
      paddingTop: '1.5rem',
      paddingLeft: '1.5rem',
    };

    // if cart is currently empty
    const totalCol = this.props.total;
    const empty = {
      padding: '1.5rem',
    };

    const messageMargin = {
      marginLeft: '15rem',
      marginRight: '15rem',
    };

    if (totalCol === 0) {
      return (
          <Container style={blueContainer}>
            <div style={innerContainer} align='center'>
              <Header as='h1' style={empty}>Your cart is currently empty!</Header>
              <Message style={messageMargin}>
                <div align='center'>
                  <Link to="/restaurants">Order here!</Link>
                </div>
              </Message>
            </div>
          </Container>
      );
    }

    const initialPrice = this.props.cartItems.reduce((total, current) => total + (current.price * current.quantity), 0);
    const tax = (initialPrice * 0.045).toFixed(2);
    const deliveryPrice = (2.50).toFixed(2);
    const totalPrice = (+initialPrice + +tax + +deliveryPrice).toFixed(2);

    return (
        <Container style={blueContainer}>
          <div style={innerContainer}>
            <Header as='h1' style={padding}>Order</Header>
            <hr className='blackBorder' style={HRMargin}/>
            {this.props.cartItems.map((cartItems, index) => <CartTable key={index} cartItems={cartItems}/>)}
            <hr className='blackBorder' style={HRMargin}/>
            <Grid columns='2' style={padding}>
              <Grid.Column>
                <Header as='h3'>Tax</Header>
                <Header as='h3'>Delivery Fee</Header>
                <Header as='h2'>Total</Header>

              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h3'>
                 $ {tax}
                </Header>
                <Header as='h3'>
                 $ {deliveryPrice}
                </Header>
                <Header as='h2'>
                 $ {totalPrice}
                </Header>
              </Grid.Column>
            </Grid>
          </div>
          <Form>
            <div align={'center'} style={buttonPadding}>
              <Form.Group inline>
                <Form.Button className='cancel_button' onClick={() => this.cancel()}>
                  Cancel
                </Form.Button>
                <Form.Button inverted className='submit_button' onClick={() => this.confirm()}>
                  Confirm
                </Form.Button>
              </Form.Group>
            </div>
          </Form>
         </Container>

    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Carts');
  return {
    cartItems: Carts.find({}).fetch(),
    total: Carts.find({}).count(),
    ready: subscription.ready(),
  };
})(Cart);