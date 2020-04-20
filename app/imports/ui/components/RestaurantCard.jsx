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
    const labelCol = {
      backgroundColor: '#D3E3FC',
      color: 'black',
      marginRight: '0.5rem',
    };

    const rateCol = {
      backgroundColor: '#00887A',
      color: 'white',
      fontWeight: 'bold',
    };

    return (
        <div style={divPad}>
          <Card
              image={this.props.restaurants.image}
              // href='#card-example-link-card'
              header= {
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign='left' width={13}>
                      <a href='#testing'>
                        <Header inverted >{this.props.restaurants.name}</Header>
                      </a>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Label circular style={rateCol} >
                        {this.props.restaurants.rating}
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              meta={this.props.restaurants.address}
              description = {
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column textAlign='left'>
                      {this.props.restaurants.time}
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Rating maxRating={1} clearable icon='heart' size='large' className={'favorite_button'}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
          />
          <div align='right'>
            {this.props.restaurants.label.map((tags) => (
                <Label circular key={tags} style={labelCol}>
                  {tags}
                </Label>
            ))}
          </div>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantCard.propTypes = {
  restaurants: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantCard);
