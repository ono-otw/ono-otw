import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class PastDeliveryTable extends React.Component {

  /** Render the Cart form. */
  render() {
    return (
        <div>
          <Grid columns='2'>
            <Grid.Column>
              <Header as='h4'>{this.props.pastdelivery.store}</Header>
              {/* eslint-disable-next-line max-len */}
              <p>{this.props.pastdelivery.weekday}, {this.props.pastdelivery.month} {this.props.pastdelivery.day} | {this.props.pastdelivery.item} item(s)</p>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <p>${this.props.pastdelivery.cost}</p>
            </Grid.Column>
          </Grid>
          <hr className='tinyBlackBorder'/>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
PastDeliveryTable.propTypes = {
  pastdelivery: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PastDeliveryTable);
