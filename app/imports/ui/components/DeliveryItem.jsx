import { Item, Popup, Rating, List } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

class DeliveryItem extends React.Component {
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
