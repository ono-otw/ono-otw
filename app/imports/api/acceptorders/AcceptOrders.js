import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const AcceptOrders = new Mongo.Collection('AcceptOrders');

/** Define a schema to specify the structure of each document in the collection. */
const AcceptOrdersSchema = new SimpleSchema({
  name: String,
  firstName: String,
  lastName: String,
  image: String,
  store: String,
  owner: String,
  quantity: Number,
  personWhoOrdered: String,
  location: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
AcceptOrders.attachSchema(AcceptOrdersSchema);

/** Make the collection and schema available to other code. */
export { AcceptOrders, AcceptOrdersSchema };
