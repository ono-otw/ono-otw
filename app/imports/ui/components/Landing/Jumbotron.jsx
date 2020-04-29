import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/Jumbotron';

const Jumbotron = () => (
       <Grid className="jumbotronRoot" centered>
           <Grid.Row>
                <Grid.Column>
                    <div className="topHeader">
                        <Header as="h1" content="Fast and Convenient Delivery" />
                    </div>
                    <div className="topDescription">
                        <Header as="h3">
                            Place an order and get it in matter of minutes. Getting food has
                            never been this convenient and fast!
                        </Header>
                    </div>
                </Grid.Column>
                <Grid.Column></Grid.Column>
                <Grid.Column></Grid.Column>
                <Image className="blob" src='images/Blob.png' />
                <Image className="deliveryMan" src='images/DeliveryMan.svg' />
           </Grid.Row>
       </Grid>
    );


export default Jumbotron;
