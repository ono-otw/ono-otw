import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import '../../styles/Landing/OrderDeliverSection';

const deliver = {
  color: 'white',
  fontSize: '1.5rem',
  marginTop: '3rem',
};

const OrderDeliverSection = () => (
        <Grid className="orderDeliver" centered>
            <Grid.Row columns="2" style={{paddingTop: '5rem'} }>
                <Grid.Column textAlign="center">
                    <Header as="h2" className="subHeader" content="Order Food"
                    style={{ paddingLeft: '5rem' }}/>
                    <Header textAlign={'center'} as="h3" className="description"
                        content=" Browse through a collection of local restaurants
                        and place an order with the click of a button!"
                    />
                    <Header textAlign={'center'} className='description'>
                      <div align={'center'} style={{ paddingRight: '2.5rem' }}>
                        <a href={'/#/restaurants'}>
                          <Button>Order here!</Button>
                        </a>
                      </div>
                    </Header>
                </Grid.Column>
                <Grid.Column textAlign="center" style={{ paddingRight: '2rem' }}>
                    <Header className="subHeader" content="Deliver Food"
                        style={{ paddingRight: '2.5rem' }}/>
                    <Header textAlign={'center'} as="h3"
                            style={deliver}
                            content= 'Want to make some money during that 7 hour gap
                            between classes?'
                    />
                    <br/>
                    <Header textAlign={'center'}>
                      <div align={'center'} style={{ paddingRight: '2.5rem' }}>
                        <a href={'/#/accept'}>
                          <Button>Accept Deliveries here!</Button>
                        </a>
                      </div>
                    </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

export default OrderDeliverSection;
