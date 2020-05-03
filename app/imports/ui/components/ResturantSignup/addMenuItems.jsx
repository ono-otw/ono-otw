

import React, { useState, Fragment } from 'react';
import { Grid, Divider, Header, Container, Segment, Form, Button, FormField } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';
import { MenuItems } from '../../../api/menuItems/MenuItems';
import swal from 'sweetalert';

// New Schema
const menuItemsSchema = new SimpleSchema({
    name: String,
    prices: Object,
    "prices.small": Number,
    "prices.medium": Number,
    "prices.large": Number
});

const addMenuItems = () => {
    
    const submit = (data, formRef) => {
        const { name, prices } = data;
        console.log(name, prices)
        const owner = Meteor.user().username;
        MenuItems.insert({name, prices, owner},
            error => {
                if (error) swal('Error', error.message, 'error');
                else {
                    swal('Sucess', 'Menu Item Added', 'sucess');
                    formRef.reset();
                }
            }    
        
        )
    }
    
    const [menu, setMenu] = useState([""]);

    const addMenuItem = () => {
        setMenu([...menu, ""])
    }

    const [prices, setPrices] = useState({
        small: 0,
        medium: 0,
        large: 0
    })

    const handlePriceChange = (event) => {
        console.log(event)
        const { name, value } = event.target;
        setPrices((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    console.log(prices)

    return (
        <Fragment>
            <Grid.Column width="16">
                <Divider horizontal>
                    <Header inverted as="h2" textAlign="center" content="Menu" />
                </Divider>
            </Grid.Column>
            <Grid.Column centered width="8">
                {menu.map(() => {
                        return (
                            <AutoForm key="" ref={ref => { fRef = ref; }} schema={menuItemsSchema} onSubmit={data => submit(data, fRef)} >
                            <Segment  style={{backgroundColor: "#D3E3FC", borderRadius: "20px", }}>
                                <Form>
                                     <TextField name='name'/>
                                     <NumField name="prices.small"   />
                                     <NumField name="prices.medium" />
                                     <NumField  name="prices.large" />
                                     <SubmitField value='Submit'/>

                                    <Form.Field style={{width: "19%"}}>
                                        <label>Resturant Image</label>
                                        <input style={{ backgroundColor: "#D3E3FC", border: "none"}} type="file" />
                                    </Form.Field>
                                </Form>
                            </Segment></AutoForm>)
                })}
            <Button 
                style={{backgroundColor: "#184470", color: "white"}}
                content="Add another menu item"
                onClick={addMenuItem}
            />
            <Button 
                style={{backgroundColor: "#184470", color: "white"}}
                content="Submit"
                onClick={submit}
            />
            </Grid.Column>
    </Fragment>
    ) 
}

export default addMenuItems;