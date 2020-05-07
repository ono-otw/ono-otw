import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class CartTable extends React.Component {

  /** Render the Cart form. */
  render() {

    const innerContainer = {
      margin: '1rem',
      backgroundColor: 'white',
      borderRadius: '20px',
    };

    const padding = {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    };

    const priceProduct = (this.props.cartItems.quantity * this.props.cartItems.price).toFixed(2);

    return (
          <div style={innerContainer}>
            <Grid columns='2'>
              <Grid.Column style={padding}>
                <Header as='h4' content={`${this.props.cartItems.quantity} 
                ${this.props.cartItems.name} (${this.props.cartItems.size})`}/>
              </Grid.Column>
              <Grid.Column textAlign='right' style={padding}>
                  <Header as='h4' content={`$ ${priceProduct}`}/>
              </Grid.Column>
            </Grid>
          </div>
    );
  }
}

/** Require a document to be passed to this component. */
CartTable.propTypes = {
  cartItems: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CartTable);
