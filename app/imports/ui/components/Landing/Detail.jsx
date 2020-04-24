import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/Detail';

const Detail = () => {
    return (
        <Grid className="detail" centered>
            <Grid.Row columns="2">
                <Grid.Column>
                    <Image className="" src='images/Blob.png' />   
                </Grid.Column>
                <Grid.Column>
                   <div className="description">
                        <Header content="oof" />
                        <Header>Ooga booga</Header>
                   </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Detail;