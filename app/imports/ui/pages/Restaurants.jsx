import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Rating, Search, Icon, Grid, Header, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItem from '../components/StuffItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const searchBar = {
      paddingBottom: '5rem',
      paddingTop: '2rem',
    };
    const divPad = {
      paddingRight: '5rem',
      paddingBottom: '2rem',
    };
    return (
        <Container>
          <div align='center'>
            <Header as='h2' inverted>
              <Header.Content>
                List of Restaurants
                <Icon name='food'/>
              </Header.Content>
            </Header>
          </div>
          <div align='center' style={searchBar}>
            <Search className='search_bar' />
          </div>
            <Card.Group itemsPerRow='4' centered className='restaurant_card'>
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

            </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStuff);
