import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profile } from '../../api/profile/Profile';
import { Restaurant } from '../../api/restaurant/Restaurant';
import { MenuItems } from '../../api/foodmenu/MenuItems';
import { Carts } from '../../api/cart/Carts';
import { AcceptOrders } from '../../api/acceptorders/AcceptOrders';
import { Favorites } from '../../api/favorites/Favorites';

// /** This subscription publishes only the documents associated with the logged in user */
// Meteor.publish('Stuff', function publish() {
//   if (this.userId) {
//     const username = Meteor.users.findOne(this.userId).username;
//     return Stuffs.find({ owner: username });
//   }
//   return this.ready();
// });
//
// /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
// Meteor.publish('StuffAdmin', function publish() {
//   if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
//     return Stuffs.find();
//   }
//   return this.ready();
// });

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Profile', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profile.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Restaurant', function publish() {
  return Restaurant.find({ approved: true });
});


Meteor.publish('AcceptOrders', function publish() {
  return AcceptOrders.find({});
});

// Meteor.publish('MenuItems', function publish() {
//   if (this.userId) {
//     const username = Meteor.users.findOne(this.userId).username;
//     return MenuItems.find({ owner: username });
//   }
//   return this.ready();
// });

Meteor.publish('MenuItems', function publish() {
  return MenuItems.find();
});


/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Carts', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Carts.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Favorites', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.find({ owner: username });
  }
  return this.ready();
});
