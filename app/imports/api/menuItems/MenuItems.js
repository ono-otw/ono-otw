import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const MenuItems = new Mongo.Collection('MenuItems');

/** Define a schema to specify the structure of each document in the collection. */
const MenuItemsSchema = new SimpleSchema({
    name: String,
    prices: Object,
    owner: String,
    "prices.small": Number,
    "prices.medium": Number,
    "prices.large": Number
}, { tracker: Tracker });

/** Attach this schema to the collection. */
MenuItems.attachSchema(MenuItemsSchema);

/** Make the collection and schema available to other code. */
export { MenuItems, MenuItemsSchema };
