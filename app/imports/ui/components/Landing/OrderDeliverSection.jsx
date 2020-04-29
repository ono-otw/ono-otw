import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/OrderDeliverSection';

const OrderDeliverSection = () => (
        <Grid className="orderDeliver" centered>
            <Grid.Row columns="2">
                <Grid.Column textAlign="center">
                    <Header as="h2" className="subHeader" content="Order Food" />
                    <Header as="h3" className="description"
                        content=" Browse through a collection of local restaurants
                        and place an order with the click of a button!"
                    />
                </Grid.Column>
                <Grid.Column textAlign="center">
                    <Header className="subHeader" content="Deliver Food" />
                    <Image className="fillerImage" src='images/OptionsFiller.png' />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

export default OrderDeliverSection;
