import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Restaurant } from '../../api/restaurant/Restaurant';

const formSchema = new SimpleSchema({
  owner: { label: 'Owner of Restaurant', type: String },
  name: { label: 'Name of Food', type: String },
  bgimg: { label: 'URL to Background Image', type: String },
  image: { label: 'URL to Image', type: String },
  address: { label: 'Address to Restaurant', type: String },
  time: { label: 'Time', type: Number },
  label: { label: 'Restaurant Labels', type: Array },
});

/** Renders the Page for adding a document. */
export default class AddRestaurant extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { owner, name, bgimg, image, address, time, label } = data;
    const rating = 5;

    Restaurant.insert({
          owner,
          name,
          bgimg,
          image,
          address,
          time,
          rating,
          label,
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
    return (
        <div className='peach padding'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add A Restaurant</Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <Form.Group widths='equal'>
                    <TextField name='owner'/>
                    <TextField name='name'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <TextField name='image'/>
                    <TextField name='bgimg'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <TextField name='address'/>
                    <TextField name='time'/>
                  </Form.Group>
                  <Form.Group>
                    <TextField name='label' value={0}/>
                    <TextField name='label' value={1}/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <SubmitField value='Submit'/>
                  </Form.Group>

                  <ErrorsField/>
                </Segment>
              </AutoForm>
              <br/>
              <br/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}
