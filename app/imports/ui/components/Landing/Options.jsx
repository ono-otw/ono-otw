import React from 'react';
import { Grid, Header, Button, Image } from 'semantic-ui-react';
import "../../styles/Landing/Options";




const Options = () => {

    // Hard Coded for now, may make constants later/put in to classes
    const fontColors = {
        color: "#F9E784",
    }
    const offset = {
        paddingBottom: "0rem",
    }

    const imageOffset = {
        height: "15rem",
        width: "30rem",
        position: "relative",
        left: "35%"
    }

    const buttonOffset = {
        position: "relative",
        left: "65%",
        marginTop: "20px"
    }

    return ( 
        <Grid className="options">
            <Grid.Row centered columns="2" style={offset}>
                <Grid.Column textAlign="center">
                    <Header size="huge" style={fontColors} as="h1" content="Order Food" />
                </Grid.Column>
                <Grid.Column textAlign="center">
                    <Header size="huge"  style={{color: "white"}}  as="h1" content="Deliver Food" />
                </Grid.Column>
            </Grid.Row>


            
            <Grid.Row columns="3"  centered>
                <Grid.Column>
                    <Header as="h1" >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta velit corporis
                         quidem deserunt adipisci numquam porro accusamus quia sed! Sunt qui odio dolore 
                         hic repudiandae autem, minima officia ad reprehenderit?
                    </Header>
                </Grid.Column>
                <Grid.Column centered>
                    <Grid.Row>
                        <Image style={imageOffset} src="images/OptionsFiller.png" />
                    </Grid.Row>
                    <Grid.Row float>
                        <Button style={buttonOffset} content="Order Now" />
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export default Options;