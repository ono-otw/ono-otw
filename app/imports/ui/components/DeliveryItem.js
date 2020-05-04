import { Item, Popup, Rating } from 'semantic-ui-react';
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
    src='https://bit.ly/3d6pGoy'/>
  }
  ><Popup.Header>Rating</Popup.Header>
    <Popup.Content> <Rating icon='star' defaultRating={4} maxRating={5} disabled/></Popup.Content>
    </Popup>
    <Item.Content>
    <Item.Header>John Foo</Item.Header>
    <Item.Description>

    </Item.Description>
    <Item.Description>User Location:</Item.Description>
    <Item.Description>Order</Item.Description>
    </Item.Content>
    </Item>
    );
  }
}

/** Require a document to be passed to this component. */
DeliveryItem.propTypes = {
  delivery: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default DeliveryItem;
