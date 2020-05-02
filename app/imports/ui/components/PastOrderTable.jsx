import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

/**
 * Profiles page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class PastOrderTable extends React.Component {

  /** Render the Cart form. */
  render() {
    return (
        <div>
          <Grid columns='2'>
            <Grid.Column>
              <Header as='h4'>{this.props.pastorder.store}</Header>
              <p>{this.props.pastorder.weekday}, {this.props.pastorder.month} {this.props.pastorder.day} | {this.props.pastorder.item} item(s)</p>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <p>${this.props.pastorder.cost}</p>
            </Grid.Column>
          </Grid>
          <hr className='tinyBlackBorder'/>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
PastOrderTable.propTypes = {
  pastorder: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PastOrderTable);
