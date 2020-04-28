import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/Jumbotron';

const Jumbotron = () => {
    return (
       <Grid className="jumbotronRoot" centered>
           <Grid.Row>
                <Grid.Column>
                    <div className="topHeader">
                        <Header as="h1" content="Fast and Convient Delivery" />
                    </div>
                    <div className="topDescription">
                        <Header as="h3"> 
                            Place an order and get in it in matter of minutes. Getting Food has 
                            never been this convient and fast. 
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
}


export default Jumbotron;