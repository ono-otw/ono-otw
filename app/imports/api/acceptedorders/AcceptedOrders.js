import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const AcceptedOrders = new Mongo.Collection('AcceptedOrders');

/** Define a schema to specify the structure of each document in the collection. */
const AcceptedOrdersSchema = new SimpleSchema({
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
  size: Array,
  'size.$': String,
  personWhoOrdered: String,
  location: String,
  lat: Number,
  long: Number,
  cost: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
AcceptedOrders.attachSchema(AcceptedOrdersSchema);

/** Make the collection and schema available to other code. */
export { AcceptedOrders, AcceptedOrdersSchema };
