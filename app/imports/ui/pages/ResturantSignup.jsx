import React from 'react';
import { Grid, Divider, Header, Container, Segment, Form } from 'semantic-ui-react';



const ResturantSignup = () => {
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
                <Grid.Column centered width="16">
                    <Segment style={{backgroundColor: "#D3E3FC"}}>
                        <Form>
                            <Form.Field>
                                <label>Resturant Name</label>
                                <input placeholder="ex. John Foo's Fishes" />
                            </Form.Field>
                            <Form.Field>
                                <label>Resturant Name</label>
                                <input placeholder="ex. John Foo's Fishes" />
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
        </Grid>
       </Container>
    );
}


export default ResturantSignup;
