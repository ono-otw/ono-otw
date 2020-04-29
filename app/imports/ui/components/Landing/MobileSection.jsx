import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/MobileSection';


const MobileSection = () => (
        <Grid centered className="mobileSection">
            <Grid.Row style={{ paddingLeft: '12rem' }}>
                <Grid.Column className="description" width={6}>
                    <div>
                        <Header as="h1" content="Mobile" style={{ marginTop: '1.5rem' }} />
                        <Header as="h2">
                            On the go and looking for convenient orders? Worry not, our mobile app is coming out soon!
                        </Header>
                    </div>
                    <div className="descriptionBkg"></div>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Image src="images/Mobile.png" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );


export default MobileSection;
