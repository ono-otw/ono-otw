import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const PastDelivery = new Mongo.Collection('PastDelivery');

/** Define a schema to specify the structure of each document in the collection. */
const PastDeliverySchema = new SimpleSchema({
  owner: String,
  store: String,
  month: String,
  day: String,
  weekday: String,
  item: Number,
  cost: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
PastDelivery.attachSchema(PastDeliverySchema);

/** Make the collection and schema available to other code. */
export { PastDelivery, PastDeliverySchema };
