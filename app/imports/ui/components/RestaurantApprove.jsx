import React from 'react';
import { Grid, Header, Button, List, Modal, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantCard from './RestaurantCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantApprove extends React.Component {
  updateItem(docID) {
    console.log(`restaurant to delete is: ${docID}`);
    swal({
      title: 'Do you want to approve this restaurant?',
      dangerMode: true,
      icon: 'warning',
      buttons: true,
    })
        /* eslint-disable-next-line */
        .then((update) => {
          if (update) {
            Restaurant.update(
                { _id: docID },
                {
                  $set: {
                    approved: true,
                  },
                },
            );
            swal('This restaurant has been approved!', {
              icon: 'success',
            });
          } else {
            swal('Restaurant not approved.');
          }
        });
  }

  render() {

    return (
        <div>
          <List>
            <Grid columns={2}>
              <Grid.Column>
                <Header>{this.props.restaurants.name}</Header>
              </Grid.Column>
              <Grid.Column>
                <Modal trigger={
                  <Button basic color={'grey'}>view</Button>
                } closeIcon
                       style={{
                         background: 'transparent', border: '0',
                         boxShadow: '0px 0px 0px 0px rgba(34, 36, 38, 0.12), ' +
                             '0px 0px 0px 0px rgba(34, 36, 38, 0.15)',
                         width: '18%',
                       }}
                       size={'small'}>
                  <Card.Group centered className='restaurant_card'>
                    <RestaurantCard restaurant={this.props.restaurants}/>
                  </Card.Group>
                </Modal>
                <Button className='accept'
                        onClick={() => this.updateItem(this.props.restaurants._id)}>Accept</Button>
              </Grid.Column>
            </Grid>
          </List>

        </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantApprove.propTypes = {
  restaurants: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantApprove);
