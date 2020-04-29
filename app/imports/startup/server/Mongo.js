import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Carts } from '../../api/cart/Carts.js';
import { Profile } from '../../api/profile/Profile';
import { Restaurant } from '../../api/restaurant/Restaurant';
import { AcceptOrders } from '../../api/acceptorders/AcceptOrders';
/* eslint-disable no-console */

const testingCart = JSON.parse(Assets.getText('testingCart.json'));

/* eslint-disable no-console */

const defaultRestaurants = JSON.parse(Assets.getText('defaultRestaurants.json'));
const defaultProfiles = JSON.parse(Assets.getText('defaultProfiles.json'));
const defaultAcceptOrders = JSON.parse(Assets.getText('defaultAcceptOrder.json'));

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addCart(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Carts.insert(data);
}

if (Carts.find().count() === 0) {
  if (testingCart) {
    console.log('Creating testing cart data.');
    testingCart.map(data => addCart(data));
  }
}

/** Initialize the database with a default data document. */
function addProfiles(data) {
  console.log(`  Adding: Profile ${data.firstName} for (${data.owner})`);
  Profile.insert(data);
}

if (Profile.find().count() === 0) {
  defaultProfiles.map(data => addProfiles(data));
}

/** Initialize the database with a default restaurants document. */
function addRestaurants(data) {
  console.log(` Adding: Restaurant listing: ${data.name} for ${data.owner}`);
  Restaurant.insert(data);
}

if (Restaurant.find().count() === 0) {
  defaultRestaurants.map(data => addRestaurants(data));
}

/** Initialize the database with a default pending orders document. */
function addAcceptOrders(data) {
  console.log(` Adding: Pending orders: ${data.name} for ${data.owner}`);
  AcceptOrders.insert(data);
}

if (AcceptOrders.find().count() === 0) {
  defaultAcceptOrders.map(data => addAcceptOrders(data));
}
