import React from 'react';
import { Card, Grid, Header, Label, Rating, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Favorites } from '../../api/favorites/Favorites';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantCard extends React.Component {

  state = { rating: 0 };

  handleRate = (e, { rating, maxRating }) => this.setState(
      { rating, maxRating },
  );

  favorite() {

    const owner = Meteor.user().username;
    const vendor = this.props.restaurant.name;

    // console.log(this.props.restaurant._id);
    // console.log(vendor)
    // console.log(owner)

    const fav = Favorites.findOne({ vendor: this.props.restaurant.name });
    if (typeof (fav) === 'undefined') {
      console.log('Not in favorites');
      Favorites.insert({ owner, vendor });
      swal({
        title: 'Added to Favorites!',
        icon: 'success',
      });
    } else {
      swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to remove this favorite?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
          .then((willDelete) => {
            if (willDelete) {
              Favorites.remove(Favorites.findOne({ vendor: this.props.restaurant.name })._id);
              this.forceUpdate();
              swal('Favorite removed.', {
                icon: 'success',
              });
            } else {
              swal('Did not remove favorite.');
            }
          });
      console.log('Already in favorites');
    }
  }

  isFavorite() {
    const fav = Favorites.findOne({ vendor: this.props.restaurant.name });
    if (typeof (fav) === 'undefined') {
      return (
          <Rating
              maxRating={1}
              icon='heart'
              size='large'
              rating={0}
              className={'favorite_button'}
              onClick={() => this.favorite()}
              onRate={this.handleRate}
          />);
    }
    return (
        <Rating
            maxRating={1}
            icon='heart'
            size='large'
            rating={1}
            className={'favorite_button'}
            onClick={() => this.favorite()}
            onRate={this.handleRate}
        />
    );

  }

  render() {
    // const divPad = {
    //   paddingRight: '5rem',
    //   paddingBottom: '2rem',
    // };

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
        <Card raised>
          <Image src={this.props.restaurant.image} as={Link} to={`/menu/${this.props.restaurant._id}`}/>
          <Card.Content>
            <Card.Description>
              <Grid>
                <Grid.Row>
                  <Grid.Column textAlign='left' width={13}>
                    <Header as={Link} to={`/menu/${this.props.restaurant._id}`}>
                      {this.props.restaurant.name}
                    </Header>
                  </Grid.Column>
                  <Grid.Column textAlign='right'>
                    <Label circular style={rateCol}>
                     {this.props.restaurant.rating.toFixed(1)}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
            <Card.Meta>
              <span>{this.props.restaurant.address}</span>
            </Card.Meta>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column textAlign='left'>
                  {this.props.restaurant.time} min
                </Grid.Column>
                 <Grid.Column textAlign='right'>
                  {this.isFavorite()}
                 </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            {this.props.restaurant.label.map((tags) => (
                <Label circular key={tags} style={labelCol}>
                  {tags}
                </Label>
            ))}
          </Card.Content>
        </Card>


        // <div style={divPad} className='fixedImg'>
        //   <Card
        //       raised
        //       image={this.props.restaurant.image}
        //       header= {
        //         <Grid>
        //           <Grid.Row>
        //             <Grid.Column textAlign='left' width={13}>
        //                 <Header as={Link} to={`/menu/${this.props.restaurant._id}`} inverted>
        //                   {this.props.restaurant.name}
        //                 </Header>
        //             </Grid.Column>
        //             <Grid.Column textAlign='right'>
        //               <Label circular style={rateCol} >
        //                 {this.props.restaurant.rating}
        //               </Label>
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //       }
        //       meta={this.props.restaurant.address}
        //       description = {
        //         <Grid columns={2}>
        //           <Grid.Row>
        //             <Grid.Column textAlign='left'>
        //               {this.props.restaurant.time} min
        //             </Grid.Column>
        //             <Grid.Column textAlign='right'>
        //               {this.isFavorite()}
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //       }
        //   />
        //   <div align='right'>
        //     {this.props.restaurant.label.map((tags) => (
        //         <Label circular key={tags} style={labelCol}>
        //           {tags}
        //         </Label>
        //     ))}
        //   </div>
        // </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantCard.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default RestaurantCard;
