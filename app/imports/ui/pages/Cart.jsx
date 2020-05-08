import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Header, Form, Message } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Carts } from '../../api/cart/Carts';
import CartTable from '../components/CartTable';
import { PendingOrders } from '../../api/pendingorders/PendingOrders';
import { Profile } from '../../api/profile/Profile';
import { PastOrder } from '../../api/pastorder/PastOrder';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Cart extends React.Component {

  state = { location: '' };

  handleChange = (e, { location, value }) => this.setState({ location: value })

  confirm(location) {


    swal({
      title: 'Are you sure?',
      text: 'Submitting your order is final.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((yes) => {
          if (yes) {
            const combinedCount = Carts.find({ combined: false }).count();
            console.log(combinedCount);

            // if we have not combined the order yet
            if (combinedCount !== 0) {
              let cart = Carts.find({});
              console.log(cart);
              const orderArray = [];
              const orderCost = [];
              const orderQuant = [];
              const orderSize = [];

              // loop through each cursor, adding the order into an orderArray
              cart.forEach(function (order) {
                // console.log(order.name);
                //  console.log(order.price);
                orderArray.push(order.name[0]);
                orderQuant.push(order.quantity[0]);
                orderCost.push(order.price);
                orderSize.push(order.size[0]);
              });

              console.log(orderArray);
              console.log(orderCost);
              console.log(orderSize);
              console.log(orderQuant);

              const totalOrder = _.map(orderCost, function (order, index) {
                return order * orderQuant[index];
              });

              console.log(totalOrder);

              const initialPrice = _.reduce(totalOrder, (total, current) => (current + total), 0);
              const tax = (initialPrice * 0.045).toFixed(2);
              const deliveryPrice = (2.50).toFixed(2);
              const sum = (+initialPrice + +tax + +deliveryPrice).toFixed(2);

              console.log(sum);
              console.log(orderArray);
              cart = Carts.findOne({});
              // console.log(cart);

              Carts.update(
                  { _id: cart._id },
                  {
                    $set: {
                      name: orderArray,
                      price: sum,
                      combined: true,
                      quantity: orderQuant,
                      size: orderSize,
                    },
                  },
              );
            }

            const order = Carts.findOne({ combined: true });
            console.log(order);
            const store = order.vendor;
            const profile = Profile.findOne({ owner: order.owner });
            const quantity = order.quantity;
            const owner = profile.owner;
            const image = profile.image;
            const firstName = profile.firstName;
            const venmo = profile.venmo;
            const lastName = profile.lastName;
            const personWhoOrdered = order.owner;
            const name = order.name;
            const cost = order.price;
            const size = order.size;

            const item = _.reduce(order.quantity, (total, current) => (current + total), 0);
            const orderTime = new Date();
            const monthOption = { month: 'long' };
            const month = new Intl.DateTimeFormat('en-US', monthOption).format(orderTime);
            const day = orderTime.getDate();
            const weekdayOption = { weekday: 'long' };
            const weekday = new Intl.DateTimeFormat('en-US', weekdayOption).format(orderTime);

            console.log(day);
            console.log(month);
            console.log(weekday);
            console.log(item);
            console.log(cost);
            console.log(owner);
            console.log(store);
            PastOrder.insert({ owner, store, month, day, weekday, item, cost });

            // console.log(store);
            // console.log(profile);
            // console.log(quantity);
            // console.log(owner);
            // console.log(image);
            // console.log(firstName);
            // console.log(lastName);
            // console.log(personWhoOrdered);
            // console.log(location);
            // console.log(name);
            // console.log(venmo);
            // console.log(location)

            PendingOrders.insert({
                  name, firstName, lastName, image, store, owner, venmo, quantity,
                  personWhoOrdered, location, size, cost,
                },
                (error) => {
                  if (error) {
                    swal('Error', error.message, 'error');
                  } else {
                    swal('Success', 'Order has been confirmed!', 'success');
                    this.forceUpdate();
                  }
                });

              let total = Carts.find({ combined: false }).count();
              while (total !== 0) {
                Carts.remove(Carts.findOne({ combined: false })._id);
                total--;
              }

            Carts.remove(Carts.findOne({ combined: true })._id);

            this.forceUpdate();
            swal('This order has been confirmed!', {
              icon: 'success',
            });
          } else {
            swal('Order was not submitted.');
          }
        });
  }

  cancel() {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to cancel your order?',
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
            swal('Order was not cancelled!');
          }
        });
  }

  /** Render the Cart form. */
  render() {

    const { location } = this.state;

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
      paddingRight: '1.5rem',
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
              <Form.TextArea required
                             label={'Location'}
                             placeholder={'Located at Sinclair library, 2nd floor.'}
                             value={location}
                             onChange={this.handleChange}
              >
              </Form.TextArea>
              <Form.Group inline>
                <Form.Button className='cancel_button' onClick={() => this.cancel()}>
                  Cancel
                </Form.Button>
                <Form.Button inverted className='submit_button' onClick={() => this.confirm(location)}>
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
  profile: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Carts');
  const subscription3 = Meteor.subscribe('PendingOrders');
  const subscription2 = Meteor.subscribe('Profile');
  return {
    cartItems: Carts.find({}).fetch(),
    profile: Profile.find({}).fetch(),
    total: Carts.find({}).count(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(Cart);
