import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Radio, Grid, Header, Image, Rating, Transition } from 'semantic-ui-react';

/**
 * ProfileMeta page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class ProfileMeta extends React.Component {

  render() {

    const profileIMG = {
      padding: '1rem',
      marginLeft: '2rem',
      marginRight: '12rem',
    };

    const linkPad = {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    };

    return (
        <div>
          <div align='right' style={linkPad}>
            <Link to={`/edit/${this.props.profile._id}`}>Edit your profile</Link>
          </div>
          <Grid textAlign="right" verticalAlign="middle" columns={2}>
            <Grid.Column>
              <div>
                <div style={profileIMG} align='center'>
                  <Image size='small' circular src={this.props.profile.image}/>
                  <p>{this.props.profile.firstName} {this.props.profile.lastName} </p>
                  <p>{`Venmo |  ${this.props.profile.venmo}`}</p>
                  <Rating icon='star' defaultRating={3} maxRating={5} disabled />
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileMeta.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileMeta);
