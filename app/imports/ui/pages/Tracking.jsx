// import React from 'react';
// import { Grid, Segment, Header, List, Input, Form, Button } from 'semantic-ui-react';
// import {
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//   } from "react-google-maps";
//
//   const MapWithAMarker = withGoogleMap(props =>
//     <GoogleMap
//       defaultZoom={18}
//       defaultCenter={{ lat: 21.3002778, lng: -157.8230556 }}
//     >
//       <Marker
//         position={{ lat: 21.3002778, lng: -157.8230556 }}
//       />
//     </GoogleMap>
//   );
//
// const Tracking = () => {
//
//
//     return (
//         <Grid centered>
//             <Grid.Column width="16">
//                 <MapWithAMarker
//                     containerElement={<div style={{ height: `400px` }} />}
//                     mapElement={<div style={{ height: `100%` }} />}
//                 />
//             </Grid.Column>
//             <Grid.Column width="6">
//                 <Header content="Estimated Time Delivery" />
//                 <Segment style={{height: "20rem"}}>
//                     <Header content="You Order" />
//                     <Header content="Panda Express"/>
//                     <List>
//                         <List.Item>1 small Drink</List.Item>
//                         <List.Item>1 Small Chicken Katsu</List.Item>
//                         <List.Item>2 Large Rice</List.Item>
//                     </List>
//                  </Segment>
//             </Grid.Column>
//             <Grid.Column width="4">
//                 <Header content="Lorem Ipsum is OTW" />
//                 <Segment style={{height: "20rem"}}></Segment>
//                 <Segment vertical="true"  style={{padding: "0 0 0 0"}}>
//                     <Form>
//                         <Form.Field>
//                             <input style={{width: "75%", marginRight: "1rem"}} placeholder="Message" />
//                             <Button content="Send" />
//                         </Form.Field>
//                     </Form>
//                 </Segment>
//             </Grid.Column>
//         </Grid>
//     );
// }
//
//
// export default Tracking;