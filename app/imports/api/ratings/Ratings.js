import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Ratings = new Mongo.Collection('Ratings');

/** Define a schema to specify the structure of each document in the collection. */
const RatingsSchema = new SimpleSchema({
  owner: String,
  rating: { type: Number, defaultValue: 0 },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ratings.attachSchema(RatingsSchema);

/** Make the collection and schema available to other code. */
export { Ratings, RatingsSchema };
