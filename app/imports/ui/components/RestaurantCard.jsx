import React from 'react';
import { Card, Grid, Header, Label, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantCard extends React.Component {

  state = { rating: 0 };

  handleRate = (e, { rating, maxRating }) => this.setState(
      { rating, maxRating },
      console.log('You clicked me'),
  );

  handleChange = (e) => this.setState(
      { rating: e.target.value },
  );

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
              image={this.props.restaurant.image}
              // href='#card-example-link-card'
              header= {
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign='left' width={13}>
                      <a href="#/menu" >
                        <Header inverted >{this.props.restaurant.name}</Header>
                      </a>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Label circular style={rateCol} >
                        {this.props.restaurant.rating}
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              meta={this.props.restaurant.address}
              description = {
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column textAlign='left'>
                      {this.props.restaurant.time} min
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Rating
                          onRate={this.handleRate}
                          maxRating={1}
                          clearable
                          icon='heart'
                          size='large'
                          rating={this.state.rating}
                          className={'favorite_button'}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
          />
          <div align='right'>
            {this.props.restaurant.label.map((tags) => (
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
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantCard);
