import React from 'react';
import { Grid, Divider, Header, Container, Segment, Form, Button, FormField } from 'semantic-ui-react';
import AddMenuItems from '../components/ResturantSignup/addMenuItems';



const ResturantSignup = () => {
    // const [itemNumber, setItemNumber] = useState(1)
    
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
                <AddMenuItems />
        </Grid>
       </Container>
    );
}


export default ResturantSignup;
