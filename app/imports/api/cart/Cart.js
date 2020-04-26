import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Cart = new Mongo.Collection('Cart');

/** Define a schema to specify the structure of each document in the collection. */
const CartSchema = new SimpleSchema({
  name: String,
  vendor: String,
  price: String,
  quantity: String,
  size: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Cart.attachSchema(CartSchema);

/** Make the collection and schema available to other code. */
export { Cart, CartSchema };
