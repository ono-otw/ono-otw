import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Restaurant } from '../../api/restaurant/Restaurant';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantTable extends React.Component {
  removeItem(docID) {
    console.log(`restaurant to delete is: ${docID}`);
    swal({
      title: 'Do you really want to delete this restaurant?',
      text: 'You cant get it back once you do!!',
      dangerMode: true,
      icon: 'warning',
    })
    /* eslint-disable-next-line */
  .then((willDelete) => {
      if (willDelete) {
        Restaurant.remove(docID);
        Restaurant.find({ RestaurantId: docID }).map((restaurant) => Restaurant.remove(restaurant._id));
        swal('This restaurant has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('You canceled the deletion!');
      }
    });
  }

  render() {

    return (
        <div>
          <Grid columns={2}>
            <Grid.Column>
              <Header>{this.props.restaurants.name}</Header>
            </Grid.Column>
            <Grid.Column>
              <Button color='red' basic onClick={() => this.removeItem(this.props.restaurants._id)}>Delete</Button>
              <Link to={`/restaurant/edit/${this.props.restaurants._id}`}>
                <Button color='blue' basic >Edit</Button>
              </Link>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantTable.propTypes = {
  restaurants: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantTable);
