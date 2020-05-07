import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const DeliveredOrders = new Mongo.Collection('DeliveredOrders');

/** Define a schema to specify the structure of each document in the collection. */
const DeliveredOrdersSchema = new SimpleSchema({
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
DeliveredOrders.attachSchema(DeliveredOrdersSchema);

/** Make the collection and schema available to other code. */
export { DeliveredOrders, DeliveredOrdersSchema };
