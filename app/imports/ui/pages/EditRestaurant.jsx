import React from 'react';
import { Grid, Loader, Header, Segment, Container, Divider } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, BoolField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Link } from 'react-router-dom';
import { Restaurant, RestaurantSchema } from '../../api/restaurant/Restaurant';

/** Renders the Page for editing a single document. */
class EditRestaurant extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { bgimg, address, image, time, label, approved, name, _id } = data;
    Restaurant.update(_id, { $set: { bgimg, address, image, time, label, approved } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {

    const paddingDiv = {
      paddingRight: '6rem',
      paddingLeft: '6rem',
      paddingBottom: '3rem',
      marginRight: '3rem',
      marginLeft: '3rem',
    };

    const formPad = {
      paddingTop: '4rem',
      paddingRight: '6rem',
      paddingLeft: '6rem',
    };

    const signContainer = {
      paddingBottom: '5rem',
      paddingLeft: '5rem',
      paddingRight: '5rem',
    };

    const rowPad = {
      paddingBottom: '1.5rem',
    };

    const button = {
      background: '#184470',
      color: 'white',
    };

    return (
        <Container style={signContainer}>
          <Grid container centered>
            <Grid.Column style={paddingDiv}>
              <Divider horizontal>
                <Header inverted as="h2" textAlign="center">
                  Edit Restaurant
                </Header>
              </Divider>
              <AutoForm schema={RestaurantSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment className='signup-form' style={formPad}>
                  <TextField
                      label='Name'
                      name='name'/>
                  <Grid columns={2} style={rowPad}>
                    <Grid.Column>
                      <TextField
                          label='Time'
                          name='time'/>
                    </Grid.Column>
                    <Grid.Column>
                      <TextField
                          label='Address'
                          name='address'/>
                    </Grid.Column>
                  </Grid>
                  <TextField
                      label='Image'
                      name='image'/>
                  <TextField
                      label='Background Image'
                      name='bgimg'/>
                  <BoolField
                    label='Approved'
                    name='approved' />
                  <div align='center'>
                    <SubmitField value='SUBMIT' style={button}/>
                  </div>
                  <ErrorsField/>
                  <HiddenField name='owner' />
                  <Link to={'/admin'}>Click to go back</Link>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditRestaurant.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    doc: Restaurant.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditRestaurant);
