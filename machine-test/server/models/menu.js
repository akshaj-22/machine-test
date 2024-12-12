const { Schema } = require('mongoose');
const { model } = require('mongoose');

const menuSchema = new Schema({
  menuName: { type: String, required: true },
  menuDesc: { type: String, required: true },
  items: [{
    itemName: { type: String, required: true },
    itemDesc: { type: String, required: true },
    itemPrice: { type: String, required: true }
  }]
});

const Menu = model('Menu', menuSchema);

module.exports = Menu;