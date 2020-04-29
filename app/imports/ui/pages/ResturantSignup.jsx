import React, { useState } from 'react';
import { Grid, Divider, Header, Container, Segment, Form, Button, FormField } from 'semantic-ui-react';




const ResturantSignup = () => {
    // const [itemNumber, setItemNumber] = useState(1)
    const [menu, setMenu] = useState([""]);

    const addMenuItem = () => {
        setMenu([...menu, ""])
    }
    return (
       <Container>
            <Grid centered>
                <Grid.Column width="16">
                    <Divider horizontal>
                        <Header inverted as="h2" textAlign="center">
                            Resturant Info
                        </Header>
                    </Divider>
                </Grid.Column>
                <Grid.Column centered width="8">
                    <Segment style={{backgroundColor: "#D3E3FC", borderRadius: "20px"}}>
                        <Form>
                            <Form.Field>
                                <label>Resturant Name</label>
                                <input placeholder="ex. John Foo's Fishes" />
                            </Form.Field>
                            <Form.Field>
                                <label>Resturant Name</label>
                                <input placeholder="ex. John Foo's Fishes" />
                            </Form.Field> 
                            <Form.Field style={{width: "19%"}}>
                                <label>Resturant Image</label>
                                <input style={{ backgroundColor: "#D3E3FC", border: "none"}} type="file" />
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>

                <Grid.Column width="16">
                    <Divider horizontal>
                        <Header inverted as="h2" textAlign="center" content="Menu" />
                    </Divider>
                </Grid.Column>
                <Grid.Column centered width="8">
                   {menu.map(number => {
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
                                            <input placeholder="Small Price"/>
                                        </li>
                                        <li style={{width: "40%"}}>
                                            <input placeholder="Medium Price"/>
                                        </li>
                                        <li style={{width: "40%"}}>
                                            <input placeholder="Large Price" />
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
        </Grid>
       </Container>
    );
}


export default ResturantSignup;
