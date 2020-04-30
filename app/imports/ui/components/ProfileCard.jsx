import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Radio, Grid, Header, Image, Rating, Transition } from 'semantic-ui-react';
import { Favorites } from '../../api/favorites/Favorites';

/**
 * ProfileCard page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class ProfileCard extends React.Component {

  state = { visibleConsumer: true, visibleDeliverer: false };


  toggleVisibility = () => this.setState((prevState) => (
      { visibleConsumer: !prevState.visibleConsumer,
        visibleDeliverer: !prevState.visibleDeliverer }));

  listFavorites() {
    const favCursor = Favorites.find();
    console.log(favCursor.collection.queries);
  }


  /** Render the ProfileCard form. */
  render() {

    const { visibleConsumer, visibleDeliverer } = this.state;

    const paddingDiv = {
      paddingRight: '3rem',
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
          <div style={innerContainer}>
            <div align='right' style={togglePad}>
              <Radio toggle
                     label = {visibleConsumer ? 'Consumer' : 'Deliverer'}
                     content={visibleConsumer ? 'Hide' : 'Show'}
                     onClick={this.toggleVisibility}/>
              <br/>
              <Link to={`/edit/${this.props.profile._id}`}>Edit your profile</Link>
            </div>
            <Grid textAlign="right" verticalAlign="middle" columns={2}>
              <Grid.Column>
                <div style={profileIMG} align='center'>
                  <Image size='small' circular src={this.props.profile.image}/>
                  <p>{this.props.profile.firstName} {this.props.profile.lastName} </p>
                  <p>{`Venmo |  ${this.props.profile.venmo}`}</p>
                  <Rating icon='star' defaultRating={3} maxRating={5} disabled />
                </div>
              </Grid.Column>
            </Grid>
            <Transition animation='horizontal flip' duration={500} visible={visibleConsumer}>
              <div style={order}>
                <div style={pastOrder}>
                  <Header>Recent Orders</Header>
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
                  <hr className='tinyBlackBorder'/>
                </div>
                <div style={favoritePadding}>
                  <Header>Favorites</Header>
                  <hr className='blackBorder'/>
                  <p>BALE | STARBUCKS | STIR FRESH</p>
                </div>
              </div>
            </Transition>
            <Transition animation='horizontal flip' duration={500} visible={visibleDeliverer}>
              <div style={order}>
                <div style={pastOrder}>
                  <Header>Recent Deliveries</Header>
                  <hr className='blackBorder'/>
                  <Grid columns='2'>
                    <Grid.Column>
                      <Header as='h4'>Starbucks</Header>
                      <p>Friday, March 27 | 1 item(s)</p>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <p>$4.00</p>
                    </Grid.Column>
                  </Grid>
                  <hr className='tinyBlackBorder'/>
                </div>
              </div>
            </Transition>
          </div>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileCard.propTypes = {
  profile: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileCard);
