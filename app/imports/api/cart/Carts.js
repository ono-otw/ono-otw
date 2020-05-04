import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Carts = new Mongo.Collection('Carts');

/** Define a schema to specify the structure of each document in the collection. */
const CartSchema = new SimpleSchema({
  name: Array,
  'name.$': String,
  vendor: String,
  owner: String,
  price: String,
  quantity: Array,
  'quantity.$': Number,
  size: String,
  combined: { type: Boolean, defaultValue: false },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Carts.attachSchema(CartSchema);

/** Make the collection and schema available to other code. */
export { Carts, CartSchema };
