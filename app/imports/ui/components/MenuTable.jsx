import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Radio, Grid, Header } from 'semantic-ui-react';
import { Carts } from '../../api/cart/Carts';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class MenuTable extends React.Component {

  /** Render the Cart form. */
  render() {

    const paddingDiv = {
      paddingRight: '3rem',
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

    return (
          <div style={innerContainer}>
            <Grid columns='2'>
              <Grid.Column>
                <Header as='h4' content={this.props.cartItems.name + this.props.cartItems.quantity}/>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h4' content={this.props.cartItems.price}/>
              </Grid.Column>
            </Grid>
          </div>
    );
  }
}

/** Require a document to be passed to this component. */
MenuTable.propTypes = {
  cartItems: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MenuTable);
