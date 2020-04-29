import React from 'react';
import { Button, Card, Header, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Profile } from '../../api/profile/Profile';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AcceptOrderCard extends React.Component {

  getName() {
    // let profile = Profile.findOne({ owner: this.props.pendingOrder.personWhoOrdered });
    // console.log(profile['image']);
    console.log(this.props.pendingOrder.personWhoOrdered);
  }

  render() {
    const divPad = {
      paddingRight: '5rem',
      paddingBottom: '2rem',
    };

    return (
        <div style={divPad}>
          <Card>
            <Card.Content>
              <div align={'center'}>
                <Header as='h2' inverted>
                  <Image circular src={this.props.pendingOrder.image} /> {this.props.pendingOrder.firstName} {this.props.pendingOrder.lastName}
                  {this.getName()}
                </Header>
                <Rating icon='star' defaultRating={3} maxRating={5} disabled />
              </div>
              <br />
              <Card.Description>
                <div align={'center'}>
                  <Header inverted>
                   Ordered From: {this.props.pendingOrder.store}
                  </Header>
                  {this.props.pendingOrder.quantity} {this.props.pendingOrder.name}
                </div>
              </Card.Description>
              <br/>
              <Card.Description>
                <div align={'center'}>
                  <Header inverted>Location</Header>
                  {this.props.pendingOrder.location}
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div align={'center'}>
                <Button color={'teal'}>Accept</Button>
              </div>
            </Card.Content>
          </Card>
        </div>

    );
  }
}

/** Require a document to be passed to this component. */
AcceptOrderCard.propTypes = {
  pendingOrder: PropTypes.object.isRequired,
  profile: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AcceptOrderCard);
