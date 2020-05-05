import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Restaurant = new Mongo.Collection('Restaurant');

/** Define a schema to specify the structure of each document in the collection. */
const RestaurantSchema = new SimpleSchema({
  owner: String,
  name: String,
  bgimg: String,
  address: String,
  image: String,
  rating: Number,
  time: Number,
  label: Array,
    'label.$': String,
  approved: { type: Boolean, defaultValue: false },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Restaurant.attachSchema(RestaurantSchema);

/** Make the collection and schema available to other code. */
export { Restaurant, RestaurantSchema };
