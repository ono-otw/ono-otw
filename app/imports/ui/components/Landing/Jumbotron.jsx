import { Grid, Image, Card, Header } from 'semantic-ui-react';
import React from 'react';
import "../../styles/Landing/Jumbotron";

const Jumbotron = props => {
    return (
    <Grid className="jumbo">
            <Grid.Row styles={"paddingTop: 0px !important"}>
                <Grid.Column className="image-offset" width={6}>
                    <Image className="image" src="images/Filler.png"/>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Card className="card">
                        <Card.Header as="h1" size="huge" textAlign="center">Fast and Convienet Delivery</Card.Header>
                        <Card.Description as="h2" textAlign="center">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto delectus reiciendis 
                            aperiam soluta possimus harum vitae dolor est vero. Impedit quod voluptatum, placeat magnam 
                            natus nostrum delectus laudantium alias!
                        </Card.Description>
                    </Card>
                </Grid.Column>
            </Grid.Row>
           
        </Grid>
    );
}


export default Jumbotron;