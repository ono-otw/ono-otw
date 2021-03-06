import React from 'react';
import { Button, Card, Header, Image, Label, Rating, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { PendingOrders } from '../../api/pendingorders/PendingOrders';
import { Profile } from '../../api/profile/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListItems extends React.Component {

  acceptOrder(docID) {
    const owner = Meteor.user().username;
    const store = this.props.pendingOrder.store;
    const firstName = this.props.pendingOrder.firstName;
    const lastName = this.props.pendingOrder.lastName;
    const image = this.props.pendingOrder.image;
    const venmo = this.props.pendingOrder.venmo;
    const quantity = this.props.pendingOrder.quantity;
    const personWhoOrdered = this.props.pendingOrder.personWhoOrdered;
    const location = this.props.pendingOrder.location;
    const name = this.props.pendingOrder.name;
    const size = this.props.pendingOrder.size;
    const cost = this.props.pendingOrder.cost;

    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to accept this order?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    })
        .then((accept) => {
          if (accept) {
            console.log('Accepting order');
            AcceptedOrders.insert({
              name, firstName, lastName, image, store, owner, venmo, quantity, cost,
              personWhoOrdered, location, size,
            });
            PendingOrders.remove(docID);
            this.forceUpdate();
            swal('Order accepted.', {
              icon: 'success',
            });
          } else {
            swal('Order was not accepted.');
          }
        });
  }

  render() {
    const divPad = {
      paddingRight: '5rem',
      paddingBottom: '3rem',
    };

    const profile = Profile.findOne({owner: this.props.pendingOrder.owner});
    
    return (
        <div style={divPad}>
          <Card>
            <Card.Content>
              <Card.Description>
                <div align={'center'}>
                  <Header inverted>
                   Ordered From: {this.props.pendingOrder.store}
                  </Header>
                  {this.props.pendingOrder.name.map((name, index) => (
                      <Label  key={name} circular color={'teal'} style={{ backgroundColor: '#00887A' }}>
                        {this.props.pendingOrder.quantity[index]} {name} - {this.props.pendingOrder.size[index]}
                      </Label>
                  ))}
                </div>
              </Card.Description>
              <br/>
              <Card.Description>
                <div align={'center'}>
                  <Header inverted>Location</Header>
                  {this.props.pendingOrder.location}
                </div>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>

    );
  }
}

/** Require a document to be passed to this component. */
ListItems.propTypes = {
  pendingOrder: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ListItems);
