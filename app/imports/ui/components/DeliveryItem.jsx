import { Item, Popup, Rating, List, Label, Button } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { PastDelivery } from '../../api/pastdelivery/PastDelivery';

class DeliveryItem extends React.Component {
  finishOrder(docID) {
    const owner = Meteor.user().username;
    const store = this.props.order.store;
    const orderTime = new Date();
    const monthOption = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', monthOption).format(orderTime);
    const day = orderTime.getDate();
    const weekdayOption = { weekday: 'long' };
    const weekday = new Intl.DateTimeFormat('en-US', weekdayOption).format(orderTime);
    const item = _.reduce(this.props.order.quantity, (total, current) => (current + total), 0);
    const cost = this.props.order.cost;

    console.log(cost);
    swal({
      title: 'Wait!',
      text: 'Are you sure you delivered the order?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    })
        .then((accept) => {
          if (accept) {
            console.log('Accepting order');
            PastDelivery.insert({
              owner, store, month, day, weekday, item, cost,
            });
            AcceptedOrders.remove(docID);
            this.forceUpdate();
            swal('Thank you!', {
              icon: 'success',
            });
          } else {
            swal('Order was not accepted.');
          }
        });
  }

  render() {
    return (
        <Item>
          <Popup
              trigger={
                <Item.Image
                    size='small'
                    src={this.props.order.image}/>
              }
          ><Popup.Header>Rating</Popup.Header>
            <Popup.Content> <Rating icon='star' defaultRating={4} maxRating={5} disabled/></Popup.Content>
          </Popup>
          <Item.Content>
            <Item.Header>{this.props.order.firstName} {this.props.order.lastName}</Item.Header>
            <Item.Description><b>Venmo:</b> {this.props.order.venmo}</Item.Description>
            <Item.Description><b>Store:</b> {this.props.order.store} </Item.Description>
            <Item.Description><b>User Location:</b> {this.props.order.location}</Item.Description>
            <Item.Description><b>Order:</b> </Item.Description>
            <List as='ul'>
              {this.props.order.name.map((name, index) => (
                  <List.Item key={name}>
                    {this.props.order.quantity[index]} {name} ({this.props.order.size[index]})
                  </List.Item>
              ))}
            </List>
            <Item.Description>
              <b>Total: </b>${this.props.order.cost.toFixed(2)}
            </Item.Description>
            <Label pointing='right' basic size='small' color='green'>Click here when done with order!</Label>
            <Button onClick={() => this.finishOrder(this.props.order._id)} color='green' icon='check'/>
          </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
DeliveryItem.propTypes = {
  order: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default DeliveryItem;
