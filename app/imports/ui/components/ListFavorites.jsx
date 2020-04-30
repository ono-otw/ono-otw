import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Radio, Grid, Header, Image, Rating, Transition } from 'semantic-ui-react';
import { Favorites } from '../../api/favorites/Favorites';


/**
 * ListFavorites page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class ListFavorites extends React.Component {

  state = { visibleConsumer: true, visibleDeliverer: false };


  toggleVisibility = () => this.setState((prevState) => (
      { visibleConsumer: !prevState.visibleConsumer,
        visibleDeliverer: !prevState.visibleDeliverer }));

  listFavorites() {
    const favCursor = Favorites.find();
    console.log(favCursor.collection.queries);
  }


  /** Render the ListFavorites form. */
  render() {


    // Otherwise return the Login form.
    return (
        <p>{` \u00a0 ${this.props.favorites.vendor}  | `}   </p>
    );
  }
}

/** Require a document to be passed to this component. */
ListFavorites.propTypes = {
  profile: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ListFavorites);
