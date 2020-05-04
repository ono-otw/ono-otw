import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      backgroundColor: 'transparent',
      zIndex: '5',
    };
    const navColor = {
      color: '#184470',
      backgroundColor: 'transparent',
    };

    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} style={navColor} activeClassName="" exact to="/">
            <Image src="images/Logo.png" size='small' />
          </Menu.Item>
          <Menu.Item as={NavLink} style={navColor} activeClassName="active" exact to="/restaurants" key='restaurants'>
            <Icon name='utensils'/>
            Restaurants
          </Menu.Item>

          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} style={navColor} activeClassName="active" exact to="/deliver" key='deliver'>
                <Icon name='truck'/>
                Deliver Order
              </Menu.Item>,
                <Menu.Item as={NavLink} style={navColor} activeClassName="active" exact to="/accept" key='accept'>
                  <Icon name='plus'/>
                  Accept Order
                </Menu.Item>,
                // eslint-disable-next-line max-len
                <Menu.Item position='right' as={NavLink} style={navColor} activeClassName="active" exact to="/cart" key='cart'>
                  <Icon name='cart'/>
                  Cart
                </Menu.Item>,
                <Menu.Item as={NavLink} style={navColor} activeClassName="active" exact to="/tracking" key='tracking'>
                  <Icon name='location arrow'/>
                  Tracking
                </Menu.Item>]

          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              [<Menu.Item as={NavLink} style={navColor} activeClassName="active" exact to="/admin" key='admin'>
                <Icon name='user secret'/>
                Admin
              </Menu.Item>,
                // eslint-disable-next-line max-len
                <Menu.Item as={NavLink} style={navColor} activeClassName="active" exact to="/addrestaurant" key='addrestaurant'>
                  <Icon name='add'/>
                  Add Restaurant
                </Menu.Item>]


          ) : ''}

          {this.props.currentUser === '' ? (
              <Menu.Item position='right'>
                <Dropdown style={navColor} text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item style={navColor} icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item style={navColor} icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
          ) : (
              <Menu.Item>
                <Dropdown icon='user' text={this.props.currentUser} pointing="top right" style={navColor}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Profile" as={NavLink} exact to="/profiles"/>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
          )}
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
