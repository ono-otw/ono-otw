import { Item, Popup, Rating, List, Label, Button } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { DeliveredOrders } from '../../api/deliveredorders/DeliveredOrders';

class DeliveryItem extends React.Component {
  finishOrder(docID) {
    const owner = Meteor.user().username;
    const store = this.props.order.store;
    const firstName = this.props.order.firstName;
    const lastName = this.props.order.lastName;
    const image = this.props.order.image;
    const venmo = this.props.order.venmo;
    const quantity = this.props.order.quantity;
    const personWhoOrdered = this.props.order.personWhoOrdered;
    const location = this.props.order.location;
    const name = this.props.order.name;

    swal({
      title: 'Wait!',
      text: 'Are you sure you delivered the order?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    })
        .then((accept) => {
          if (accept) {
            console.log('Accepting order');
            DeliveredOrders.insert({
              name, firstName, lastName, image, store, owner, venmo, quantity,
              personWhoOrdered, location,
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
                    {this.props.order.quantity[index]} {name}
                  </List.Item>
              ))}
            </List>
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
