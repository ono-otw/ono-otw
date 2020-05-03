import React from 'react';
import { Card, Grid, Image, Modal, Header, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Carts } from '../../../api/cart/Carts';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuitemCard extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  // eslint-disable-next-line consistent-return
  submitOrder(name, vendor, price, quantity, size) {
    if (Meteor.user()) {
      const owner = Meteor.user().username;
      swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to add this to your cart?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
          .then((yes) => {
            if (yes) {
              console.log(name)
              console.log(vendor)
              console.log(owner)
              console.log(price)
              console.log(quantity)
              console.log(size)
              Carts.insert({ name, vendor, owner, price, quantity, size });
              this.forceUpdate();
              swal('Order has been added to the cart.', {
                icon: 'success',
              });
            } else {
              swal('Order was not added to cart');
            }
          });
    } else {
      console.log('User is not logged in.');
      swal({
        title: 'You are not logged in!',
        text: 'Please login to order.',
        icon: 'warning',
        buttons: false,
        dangerMode: true,
      });
    }
  }

  render() {
    const { value } = this.state;

    let valueCost = {};
    if (value === 'sm') {
      valueCost = 0;
    } else if (value === 'md') {
      valueCost = 1;
    } else if (value === 'lg') {
      valueCost = 2;
    }
    const cardHeader = {
      padding: '10px',
      fontSize: '15px',
      fontWeight: 'bold',
    };

    const cardPadding = {
      padding: '30px',
    };

    return (
        <div style={cardPadding} className='itemcard_text'>

          {/* ----------------------MODAL--------------------------- */}
          {/* the modal is triggered by pressing on the card, which is why I encased the entire card in the trigger */}
          {/* function */}

          <Modal size='mini' className='item_modal' closeIcon trigger={
            <Card raised className='itemcard_text'>
              <Card.Content>
                <Grid columns={2}>
                  <Grid.Column>
                    <Image
                        rounded
                        floated='left'
                        size='medium'
                        src={this.props.menuitem.image}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Header style={cardHeader}>{this.props.menuitem.name}</Card.Header>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          }>
            <Modal.Content>
              <Image rounded size='medium' centered src={this.props.menuitem.image}/>
              <Header textAlign='center' as='h1' inverted>{this.props.menuitem.name}</Header>
              <Header inverted>Size</Header>
              <hr/>
              <Form>
                <Form.Field>
                  <Form.Radio label={this.props.menuitem.size[0]}
                              value='sm'
                              checked={value === 'sm'}
                              onChange={this.handleChange}/>
                  <Form.Radio label={this.props.menuitem.size[1]}
                              value='md'
                              checked={value === 'md'}
                              onChange={this.handleChange}/>
                  <Form.Radio label={this.props.menuitem.size[2]}
                              value='lg'
                              checked={value === 'lg'}
                              onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>

              <div align='center' style={{ marginTop: '75px' }}>
                <Button className='dark-blue-button'
                        onClick={() => this.submitOrder(this.props.menuitem.name,
                            this.props.menuitem.owner, this.props.menuitem.cost[valueCost],
                            1, this.props.menuitem.size[valueCost])}>
                  Add to Cart - ${this.props.menuitem.cost[valueCost]}
                </Button>
              </div>
            </Modal.Content>
          </Modal>

        </div>
    );
  }
}

MenuitemCard.propTypes = {
  menuitem: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MenuitemCard);
