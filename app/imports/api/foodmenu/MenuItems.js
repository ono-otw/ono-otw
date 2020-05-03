import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const MenuItems = new Mongo.Collection('MenuItems');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  owner: String,
  vendor: String,
  name: String,
  image: String,
  cost: Array,
  'cost.$': Number,
  size: Array,
  'size.$': String,
  label: String
}, { tracker: Tracker });

/** Attach this schema to the collection. */
MenuItems.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { MenuItems, MenuSchema };
