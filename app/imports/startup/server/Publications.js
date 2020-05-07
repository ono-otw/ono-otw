import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profile } from '../../api/profile/Profile';
import { Restaurant } from '../../api/restaurant/Restaurant';
import { MenuItems } from '../../api/foodmenu/MenuItems';
import { Carts } from '../../api/cart/Carts';
import { Favorites } from '../../api/favorites/Favorites';
import { PastOrder } from '../../api/pastorder/PastOrder';
import { PendingOrders } from '../../api/pendingorders/PendingOrders';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { PastDelivery } from '../../api/pastdelivery/PastDelivery';


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


Meteor.publish('PendingOrders', function publish() {
  return PendingOrders.find({});
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

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('PastOrder', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return PastOrder.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('AcceptedOrders', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return AcceptedOrders.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('PastDelivery', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return PastDelivery.find({ owner: username });
  }
  return this.ready();
});