import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../../styles/Landing/DetailsSection';
import Detail from './Detail';


const state = {
   temp: [
        {
            header: 'Easy Order',
            image: 'images/temp1.png',
            description: "That's it! Never has been more simple!",
        },
        {
            header: 'Fast Delivery',
            image: 'images/temp2.png',
            description: 'Deliveries made by your fellow UH Students!',
        },
        {
            header: 'Support Local Business',
            image: 'images/temp3.png',
            description: 'Contact us at admin@ootw.com to be partnered!',
        },
   ],
};

const DetailsSection = () => (
        <Grid className="detailsSection" centered>
            <Grid.Row>
            {state.temp.map(items => (
                <Detail header={items.header} description={items.description} image={items.image} />
            ))}
            </Grid.Row>
        </Grid>
    );


export default DetailsSection;
