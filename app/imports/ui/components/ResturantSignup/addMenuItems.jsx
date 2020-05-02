

import React, { useState, Fragment } from 'react';
import { Grid, Divider, Header, Container, Segment, Form, Button, FormField } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import { number } from 'prop-types';

// New Schema
// const menuItemsSchema = new SimpleSchema({
//     name: String,
//     prices: {
//         small: number,
//         medium: number,
//         large: number
//     },
// });

const addMenuItems = () => {
    
    const submit = (data, formRefs) => {

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
                        return (<Segment  style={{backgroundColor: "#D3E3FC", borderRadius: "20px", }}>
                            <Form>
                                <FormField>
                                    <label>Item</label>
                                    <input style={{width: "60%"}} type="text" placeholder="Ex. Chicken Katsu"/>
                                </FormField>
                                <FormField>
                                    <label>Prices</label>
                                    <ul style={{listStyleType: "none"}}>
                                        <li style={{width: "40%"}}>
                                            <input onChange={handlePriceChange} 
                                                type="number" 
                                                placeholder="Small Price"
                                                name="small"
                                            />
                                        </li>
                                        <li style={{width: "40%"}}>
                                            <input  onChange={handlePriceChange} 
                                                type="number" 
                                                placeholder="Medium Price"
                                                name="medium"
                                            />
                                        </li>
                                        <li style={{width: "40%"}}>
                                            <input onChange={handlePriceChange} 
                                                type="number" 
                                                placeholder="Large Price" 
                                                name="large"
                                            />
                                        </li>
                                    </ul>
                                </FormField>
                                <Form.Field style={{width: "19%"}}>
                                    <label>Resturant Image</label>
                                    <input style={{ backgroundColor: "#D3E3FC", border: "none"}} type="file" />
                                </Form.Field>
                            </Form>
                        </Segment>)
            })}
            <Button 
                style={{backgroundColor: "#184470", color: "white"}}
                content="Add another menu item"
                onClick={addMenuItem}
            />
            </Grid.Column>
    </Fragment>
    ) 
}

export default addMenuItems;