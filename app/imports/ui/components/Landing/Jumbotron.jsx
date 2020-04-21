import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/Jumbotron';

const Jumbotron = () => {
    return (
       <Grid centered>
           <Grid.Row>
                <Grid.Column>
                    <Header content="Fast and Convient Delivery" />
                </Grid.Column>
                <Grid.Column></Grid.Column>
                <Grid.Column></Grid.Column>
                <Image className="blob" src='images/Blob.png' />
                <Image className="deliveryMan" src='images/DeliveryMan.svg' />
           </Grid.Row>
       </Grid>
    );
}


export default Jumbotron;