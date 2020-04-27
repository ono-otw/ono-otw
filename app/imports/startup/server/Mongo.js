import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Cart } from '../../api/cart/Cart.js';
/* eslint-disable no-console */

const testingCart = JSON.parse(Assets.getText('testingCart.json'));

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
  Stuffs.insert(data);
}

if (Cart.find().count() === 0) {
  if (testingCart) {
    console.log('Creating testing cart data.');
    testingCart.map(data => addCart(data));
  }
}
