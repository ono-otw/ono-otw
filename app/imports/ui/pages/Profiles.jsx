import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Grid,
  Header,
  Loader,
  Radio,
  Transition,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Profile } from '../../api/profile/Profile';
import { Favorites } from '../../api/favorites/Favorites';
import { PastOrder } from '../../api/pastorder/PastOrder';
import ListFavorites from '../components/ListFavorites';
import ProfileMeta from '../components/ProfileMeta';
import PastOrderTable from '../components/PastOrderTable';


/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Profiles extends React.Component {

  state = { visibleConsumer: true, visibleDeliverer: false };


  toggleVisibility = () => this.setState((prevState) => (
      { visibleConsumer: !prevState.visibleConsumer,
        visibleDeliverer: !prevState.visibleDeliverer }));

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the Profiles form. */
  renderPage() {

    const { visibleConsumer, visibleDeliverer } = this.state;

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

    const inLine = {
      display: 'inline-flex',
    };

    const favoritePadding = {
      paddingBottom: '2.5rem',
    };
    const order = {
      paddingLeft: '2.7rem',
      paddingRight: '2.7rem',
    };

    const togglePad = {
      paddingLeft: '1.5rem',
      paddingTop: '1.5rem',
      paddingRight: '1.5rem',
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
                     label = {visibleConsumer ? 'Consumer' : 'Deliverer'}
                     content={visibleConsumer ? 'Hide' : 'Show'}
                     onClick={this.toggleVisibility}/>
              <br/>
            </div>
            {this.props.profile.map((profile, index) => <ProfileMeta key={index} profile={profile}/>)}
            <Transition animation='horizontal flip' duration={500} visible={visibleConsumer}>
              <div style={order}>
                <div style={pastOrder}>
                  <Header>Recent Orders</Header>
                  <hr className='blackBorder'/>

                  {/* Render via components here for recent orders */}

                  {this.props.pastorder.map((pastorder, index) => <PastOrderTable key={index} pastorder={pastorder}/>)}

                  {/* Render via components here for recent orders */}

                </div>
                <div style={favoritePadding}>
                  <Header>Favorites</Header>
                  <hr className='blackBorder'/>
                  <div style={inLine}>
                    {this.props.favorites.map((favorites, index) => <ListFavorites key={index} favorites={favorites}/>)}
                  </div>
                </div>
              </div>
            </Transition>
            <Transition animation='horizontal flip' duration={500} visible={visibleDeliverer}>
              <div style={order}>
                <div style={pastOrder}>
                  <Header>Recent Deliveries</Header>
                  <hr className='blackBorder'/>

                  {/* Render via components here for recent deliveries */}

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

                  {/* Render via components here for recent orders */}

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
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired,
  pastorder: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profile');
  const subscription1 = Meteor.subscribe('Favorites');
  const subscription2 = Meteor.subscribe('PastOrder');

  return {
    profile: Profile.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    pastorder: PastOrder.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready() && subscription2.ready(),
  };
})(Profiles);
