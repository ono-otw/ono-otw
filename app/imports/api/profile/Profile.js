import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Profile = new Mongo.Collection('Profile');

/** Define a schema to specify the structure of each document in the collection. */
const ProfileSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  image: { type: String, defaultValue: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' },
  venmo: String,
  owner: String,
  rating: { type: Number, defaultValue: 5 },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profile.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profile, ProfileSchema };
