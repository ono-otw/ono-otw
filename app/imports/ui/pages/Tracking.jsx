import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Card, Segment, Header, List, Input, Form, Button, Label } from 'semantic-ui-react';
import { PendingOrders } from '../../api/pendingorders/PendingOrders';
import { PastOrder } from '../../api/pastorder/PastOrder';
import { PastDelivery } from '../../api/pastdelivery/PastDelivery';
import { Profile } from '../../api/profile/Profile';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { withTracker } from 'meteor/react-meteor-data';
import AcceptOrderCard from '../components/AcceptOrderCard';
import ListItems from '../components/ListItems'
import Geocode from "react-geocode";
import {
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";

 

const Tracking = (props) => {
    const userOrder = [];
    const user = Meteor.user().username;
    const userProfile = Profile.find({ owner: user });
   
    const {uLat, _lat} = useState(0);
    const {uLong, _long} = useState(0)
    let tempLat = 21.4389;
    let tempLong =  158.0001;
    Geocode.setApiKey("AIzaSyAcitX2jxGewJTZZMMxLA4VewPJ2_dGApg");
    console.log(user)
   for (let i = 0; i < AcceptedOrders.find().count(); i++) {
       if (props.acceptedOrders[i].owner == user) { 
           console.log(props.acceptedOrders[i])
           userOrder.push(props.acceptedOrders[i]) 
          
        //    if (i == 0) {
        //         tempLat = props.pendingOrder[i].lat;
        //         tempLong = props.pendingOrder[i].long;
        //    }
        //    if (i == 0) {
        //        if (user !== "john@foo.com" || user !== "admin@foo.com") {
        //             tempLat = props.pendingOrder[i].lat;
        //             tempLong = props.pendingOrder[i].long;
        //        }
        //    }
        //    if (i == 1) {
        //         if (user === "john@foo.com" || user === "admin@foo.com") {
        //             tempLat = props.pendingOrder[i].lat;
        //             tempLong = props.pendingOrder[i].long;
        //         }
        //     }
        }
       
   }
    console.log(tempLat, tempLong)
    console.log(userOrder);
    console.log(props.pendingOrder)
    console.log(props.acceptedOrders)
    
    const MapWithAMarker = withGoogleMap(() =>
        <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 21.4666648, lng: -157.9833294 }}
        // defaultCenter={{ lat: userOrder[0].lat, lng: userOrder[0].long }} 
        >
        {userOrder.map(e => <Marker position={{lat: e.lat, lng: e.long }} />)}
        {/* <Marker
            position={{ lat: 21.3002778, lng: -157.8230556 }}
        /> */}
        </GoogleMap>
    );

    return (
        <Grid centered>
            <Grid.Column width="16" style={{marginBottom: "5rem"}}>
                <MapWithAMarker
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </Grid.Column>
            <Card.Group className='accept_card' centered>
                {/* eslint-disable-next-line max-len */}
                {/* <List>
                {userOrder.map((e, index) => {
                    <List.item>
                        <Header inverted>
                            Ordered From: {e.store}
                        </Header>
                       
                    </List.item>
                })}
                </List> */}
                <br />
                {userOrder.map((pendingOrder, index) => <ListItems key={index} pendingOrder={pendingOrder}/>)}

          </Card.Group>
            {/* <Grid.Column width="6">
                <Header content="You Order" />
                <Segment style={{height: "20rem"}}>
                    <Header content="Panda Express"/>
                        {userOrder.map(e => console.log(e))}           
                 </Segment>
            </Grid.Column> */}
            {/* <Grid.Column width="4">
                <Header content="Lorem Ipsum is OTW" />
                <Segment style={{height: "20rem"}}></Segment>
                <Segment vertical="true"  style={{padding: "0 0 0 0"}}>
                    <Form>
                        <Form.Field>
                            <input style={{width: "75%", marginRight: "1rem"}} placeholder="Message" />
                            <Button content="Send" />
                        </Form.Field>
                    </Form>
                </Segment>
            </Grid.Column> */}
        </Grid>
    );
}

export default withTracker(() => {
  const sub = Meteor.subscribe('Profile');
  const sub1 = Meteor.subscribe('Favorites');
  const sub2 = Meteor.subscribe('PastOrder');
  const sub3 = Meteor.subscribe('PastDelivery');
  const subscription3 = Meteor.subscribe('PendingOrders');
  const sub4 = Meteor.subscribe('AcceptedOrders');

  return {
    pendingOrder: PendingOrders.find({}).fetch(),
    profile: Profile.find({}).fetch(),
    pastorder: PastOrder.find({ hasRated: true }).fetch(),
    pastdelivery: PastDelivery.find({}).fetch(),
    ready: sub.ready() && sub1.ready() && sub2.ready() && sub3.ready(),
    acceptedOrders: AcceptedOrders.find({}).fetch()
  };
  })(Tracking);
  