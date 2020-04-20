import React from 'react';
import { Card, Grid, Header, Label, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantCard extends React.Component {
  render() {
    const divPad = {
      paddingRight: '5rem',
      paddingBottom: '2rem',
    };

    return (
        <div style={divPad}>
          <Card
              image='http://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1543943359/photos/286785_original.jpg'
              // href='#card-example-link-card'
              header= {
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign='left' width={13}>
                      <a href='#testing'>
                        <Header inverted >Raising Canes</Header>
                      </a>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Label circular color='green' >
                        4.5
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              meta='2465 Campus Rd #220'
              description = {
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column textAlign='left'>
                      15 Min
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Rating maxRating={1} clearable icon='heart'/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
          />
          <Label color='grey'>Chicken</Label>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantCard.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantCard);
