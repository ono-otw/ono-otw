import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuitemCard extends React.Component {
  render() {
    const cardHeader = {
      padding: '10px',
      fontSize: '15px',
      fontWeight: 'bold',
    };

    const cardPad = {
      padding: '30px',
    };

    return (
        <div style={cardPad}>
          <Card>
            <Card.Content>
              <Grid columns={2}>
                <Grid.Column>
                  <Image
                      rounded
                      floated='left'
                      size='medium'
                      src={this.props.menuitem.image}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Card.Header style={cardHeader}>{this.props.menuitem.name}</Card.Header>
                  <Card.Description>
                    {this.props.menuitem.calories} Cal<br/>
                    {this.props.menuitem.size} oz<br/>
                    ${this.props.menuitem.price}<br/>
                  </Card.Description>
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
MenuitemCard.propTypes = {
  menuitem: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MenuitemCard);
