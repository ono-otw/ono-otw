import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Radio, Grid, Header, Image, Rating, Transition } from 'semantic-ui-react';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Profiles extends React.Component {
  state = { visible: true };


  toggleVisibility = () => this.setState((prevState) => (
          { visible: !prevState.visible }));


  /** Render the Profiles form. */
  render() {
    const { visible } = this.state;

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

    const profileIMG = {
      padding: '1rem',
      marginLeft: '2rem',
      marginRight: '12rem',
    };

    const togglePad = {
      padding: '1.5rem',
    };

    const order = {
      padding: '2rem',
    };

    const favoritePadding = {
      paddingBottom: '2.5rem',
    };

    const pastOrder = {
      paddingBottom: '5rem',
    };

    // Otherwise return the Login form.
    return (
        <Container style={blueContainer}>
          <div style={innerContainer}>
            <div align='right' style={togglePad}>
              <Radio toggle
                     label = {visible ? 'Consumer' : 'Deliverer'}
                     content={visible ? 'Hide' : 'Show'}
                     onClick={this.toggleVisibility}/>
              <br/>
              <a href='/#edit'>
                Edit your profile
              </a>
            </div>
            <Grid textAlign="right" verticalAlign="middle" columns={2}>
              <Grid.Column>
                <div style={profileIMG} align='center'>
                  <Image size='small' circular src='https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'/>
                  <p>John Doe</p>
                  <Rating icon='star' defaultRating={3} maxRating={4} />
                </div>
              </Grid.Column>
              <Grid.Column style={paddingDiv}>
              </Grid.Column>
            </Grid>
            <Transition animation='horizontal flip' duration={500} visible={visible}>
            <div style={order}>
              <div style={pastOrder}>
                <Header>Recent Orders</Header>
                <hr className='blackBorder'/>
                <Grid columns='2'>
                  <Grid.Column>
                    <Header as='h4'>Bale</Header>
                    <p>Sunday, March 29 | 2 items</p>
                  </Grid.Column>
                  <Grid.Column textAlign='right'>
                    <p>$12.43</p>
                  </Grid.Column>
                </Grid>
                <hr className='tinyBlackBorder'/>
              </div>
              <div style={favoritePadding}>
                <Header>Favorites</Header>
                <hr className='blackBorder'/>
                <p>BALE | STARBUCKS | STIR FRESH</p>
              </div>
            </div>
            </Transition>
          </div>
         </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Profiles.propTypes = {
  location: PropTypes.object,
};
