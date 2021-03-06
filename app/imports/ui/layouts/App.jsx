import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Signin from '../pages/Signin';
import Landing from '../pages/Landing';
import Footer from '../components/Footer';
import Restaurants from '../pages/Restaurants';
import Profiles from '../pages/Profiles';
import EditProfile from '../pages/EditProfile';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Cart from '../pages/Cart';
import Admin from '../pages/Admin';
import AcceptOrder from '../pages/AcceptOrder';
import Menu from '../pages/RestaurantMenus';
import ResturantSignup from '../pages/ResturantSignup';
import Deliveries from '../pages/Deliveries';
import AddRestaurant from '../pages/AddRestaurant';
import EditRestaurant from '../pages/EditRestaurant';
import Rating from '../pages/Rating';
import Tracking from '../pages/Tracking';
import NotFound from '../pages/NotFound';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/signout" component={Signout}/>
              <ProtectedRoute path="/profiles" component={Profiles}/>
              <ProtectedRoute path="/edit/:_id" component={EditProfile}/>
              <AdminProtectedRoute path="/restaurant/edit/:_id" component={EditRestaurant}/>
              <Route path="/restaurants" component={Restaurants}/>
              <Route path="/resturant-signup" component={ResturantSignup}/>
              <Route path="/menu/:_id" component={Menu}/>
              <ProtectedRoute path="/rate" component={Rating}/>
              <ProtectedRoute path="/tracking" component={Tracking}/>
              <ProtectedRoute path="/cart" component={Cart}/>
              <ProtectedRoute path="/deliver" component={Deliveries}/>
              <ProtectedRoute path="/accept" component={AcceptOrder}/>
              <AdminProtectedRoute path="/admin" component={Admin}/>
              <AdminProtectedRoute path="/addrestaurant" component={AddRestaurant}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
