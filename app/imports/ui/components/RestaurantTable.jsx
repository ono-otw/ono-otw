import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantTable extends React.Component {

  render() {
    const innerContainer = {
      margin: '1rem',
      backgroundColor: 'white',
      borderRadius: '20px',
    };

    const padding = {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    };

    return (
        <div>
          <Grid columns={2}>
            <Grid.Column>
            <Header>{this.props.restaurants.name}</Header>
            </Grid.Column>
            <Grid.Column>
              Edit
            </Grid.Column>
          </Grid>
        </div>
        // <div style={innerContainer}>
        //   <Grid columns='2'>
        //     <Grid.Column style={padding}
        //       content={`${this.props.restaurants.name} `}>
        //     </Grid.Column>
        //     <Grid.Column textAlign='right' style={padding} content={'Edit'}>
        //     </Grid.Column>
        //   </Grid>
        // </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantTable.propTypes = {
  restaurants: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantTable);
