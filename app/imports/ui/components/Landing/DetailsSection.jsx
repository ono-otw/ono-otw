import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../styles/Landing/DetailsSection';
import Detail from './Detail';


let state = {
   temp: [
        {
            header: "Easy Order",
            image: "images/temp1.png",
            description: "That's it! Never has been more simple!"
        },
        {
            header: "Fast Delivery",
            image: "images/temp2.png",
            description: "Delivery's made by your fellow UH Students"
        },
        {
            header: "Support Local Business",
            image: "images/temp3.png",
            description: "Looking for a Place to Eat? Or support Local Business?"
        }
   ]
}


const DetailsSection = () => {
    return (
        <Grid className="detailsSection" centered>
            <Grid.Row>
            {state.temp.map(items => (
                <Detail header={items.text} description={items.description} image={items.image} />
            ))}
            </Grid.Row>
        </Grid>
    )
}


export default DetailsSection;
