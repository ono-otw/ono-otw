import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Radio, Grid, Header } from 'semantic-ui-react';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Cart extends React.Component {

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
        <Container style={blueContainer}>
          <div style={innerContainer}>
            <Header>Order</Header>
            <hr className='blackBorder'/>
            <Grid columns='2'>
              <Grid.Column>
                <Header as='h4'>Bale</Header>
                <p>Sunday, March 29 | 2 item(s)</p>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <p>$12.43</p>
              </Grid.Column>
            </Grid>
          </div>
         </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Cart.propTypes = {
  location: PropTypes.object,
};
