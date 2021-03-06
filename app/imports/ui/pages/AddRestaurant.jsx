import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, SubmitField, ErrorsField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Restaurant } from '../../api/restaurant/Restaurant';


const formSchema = new SimpleSchema({
  owner: String,
  name: String,
  bgimg: String,
  image: String,
  address: String,
  time: Number,
  label: Array,
  'label.$': String,
});

/** Renders the Page for adding a document. */
export default class AddRestaurant extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { owner, name, bgimg, image, address, time, label } = data;
    const rating = 5;
    const approved = false;

    Restaurant.insert({
          owner,
          name,
          bgimg,
          image,
          address,
          time,
          rating,
          label,
          approved,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }



  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;

    const formPad = {
      paddingTop: '4rem',
      paddingRight: '6rem',
      paddingLeft: '6rem',
    };

    return (
        <div className='peach padding'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Add Restaurant Form</Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment className='signup-form' style={formPad}>
                    <TextField label='Name of Restaurant' name='name'/>
                    <TextField label='Owner' name='owner' />
                    <TextField label='URL For Background Image' name='bgimg'/>
                    <TextField label='URL For Image' name='image'/>
                    <TextField label='Restaurant Address' name='address'/>
                    <TextField label='Approximate Wait Time' name='time'/>
                    <TextField label='Restaurant Labels' name='label'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}
