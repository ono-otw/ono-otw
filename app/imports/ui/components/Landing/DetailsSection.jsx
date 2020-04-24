import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/DetailsSection';
import Detail from './Detail';

const DetailsSection = () => {
    return (
        <Grid className="detailsSection" centered>
            <Grid.Row>
                <Detail />
            </Grid.Row>
        </Grid>
    )
}


export default DetailsSection;