import { Meteor } from 'meteor/meteor';
import { Profile } from '../../api/profile/Profile';
import { Restaurant } from '../../api/restaurant/Restaurant';
import { MenuItems } from '../../api/foodmenu/MenuItems';
import { Carts } from '../../api/cart/Carts';
import { Favorites } from '../../api/favorites/Favorites';
import { PastOrder } from '../../api/pastorder/PastOrder';
import { PendingOrders } from '../../api/pendingorders/PendingOrders';
import { AcceptedOrders } from '../../api/acceptedorders/AcceptedOrders';
import { PastDelivery } from '../../api/pastdelivery/PastDelivery';
import { Ratings } from '../../api/ratings/Ratings';

Meteor.publish('Profile', function publish() {
  return Profile.find({});
});

Meteor.publish('Restaurant', function publish() {
  return Restaurant.find({});
});


Meteor.publish('PendingOrders', function publish() {
  return PendingOrders.find({});
});

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

Meteor.publish('Ratings', function publish() {
  return Ratings.find();
});

