import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const PendingOrders = new Mongo.Collection('PendingOrders');

/** Define a schema to specify the structure of each document in the collection. */
const PendingOrdersSchema = new SimpleSchema({
  name: Array,
    'name.$': String,
  firstName: String,
  lastName: String,
  venmo: String,
  image: String,
  store: String,
  owner: String,
  quantity: Array,
  'quantity.$': Number,
  personWhoOrdered: String,
  location: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
PendingOrders.attachSchema(PendingOrdersSchema);

/** Make the collection and schema available to other code. */
export { PendingOrders, PendingOrdersSchema };
