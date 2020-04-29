import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profile } from '../../api/profile/Profile';
import { Restaurant } from '../../api/restaurant/Restaurant';
import { Carts } from '../../api/cart/Carts';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

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

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Carts', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Carts.find({ owner: username });
  }
  return this.ready();
});
