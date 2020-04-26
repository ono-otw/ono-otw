import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/Detail';

const Detail = props => {
    const {header, description, image} = props;
    return (
        <Grid className="detail" centered>
            <Grid.Row >
                <Grid.Column width="4">
                    <Image className="fillerImage" src={image} />   
                </Grid.Column>
                <Grid.Column width="1"></Grid.Column>
                <Grid.Column className="description" width="10">
                   <div className="descriptionContent">
                        <Header content={header} />
                        <Header content={description} />
                   </div>
                   <div className="descriptionBkg"></div>   
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Detail;

