import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import ProfileCard from '../components/ProfileCard';
import { Profile } from '../../api/profile/Profile';
import { Favorites } from '../../api/favorites/Favorites';
import ListFavorites from '../components/ListFavorites';


/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Profiles extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the Profiles form. */
  renderPage() {

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
    }

    const favoritePadding = {
      paddingBottom: '2.5rem',
    };
    const order = {
      paddingLeft: '2.7rem',
    };

    // Otherwise return the Login form.
    return (
        <Container style={blueContainer}>
          <div style={innerContainer}>
            {this.props.profile.map((profile, index) => <ProfileCard key={index} profile={profile}/>)}
            <div style={order}>
              <div style={favoritePadding}>
                <div style={inLine}>
                  {this.props.favorites.map((favorites, index) => <ListFavorites key={index} favorites={favorites}/>)}
                </div>
              </div>
            </div>
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
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profile');
  const subscription1 = Meteor.subscribe('Favorites');

  return {
    profile: Profile.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(Profiles);
