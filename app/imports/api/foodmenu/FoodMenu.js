import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const FoodMenu = new Mongo.Collection('FoodMenu');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  owner: String,
  name: String,
  image: String,
  cost: Array,
  'cost.$': Number,
  calories: Array,
  'calories.$': Number,
  size: Array,
  'size.$': String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
FoodMenu.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { FoodMenu, MenuSchema };
