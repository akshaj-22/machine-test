const express = require('express');
const Menu = require('../models/menu'); // Adjust the path as necessary to where your schema is located.

const router = express.Router();

// Route to get all menus
router.get('/menus', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to get a menu by ID
router.get('/menus/:menuId', async (req, res) => {
    const { menuId } = req.params;
    try {
      const menu = await Menu.findById(menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to get an item by ID within a menu
  router.get('/menus/:menuId/items/:itemId', async (req, res) => {
    const { menuId, itemId } = req.params;
    try {
      const menu = await Menu.findById(menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
      const item = menu.items.id(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Route to post a new menu
router.post('/menus', async (req, res) => {
  const { menuName, menuDesc } = req.body;
  try {
    const newMenu = new Menu({ menuName, menuDesc });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to add an item to an existing menu
router.post('/menus/:menuId/items', async (req, res) => {
  const { menuId } = req.params;
  const { itemName, itemDesc, itemPrice } = req.body;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    menu.items.push({ itemName, itemDesc, itemPrice });
    await menu.save();
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all items for a specific menu
router.get('/menus/:menuId/items', async (req, res) => {
  const { menuId } = req.params;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.status(200).json(menu.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a menu
router.delete('/menus/:menuId', async (req, res) => {
  const { menuId } = req.params;
  try {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a menu
router.put('/menus/:menuId', async (req, res) => {
  const { menuId } = req.params;
  const { menuName, menuDesc } = req.body;
  try {
    const menu = await Menu.findByIdAndUpdate(
      menuId,
      { menuName, menuDesc },
      { new: true, runValidators: true }
    );
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete an item from a menu
router.delete('/menus/:menuId/items/:itemId', async (req, res) => {
  const { menuId, itemId } = req.params;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    const itemIndex = menu.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    menu.items.splice(itemIndex, 1);
    await menu.save();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an item in a menu
router.put('/menus/:menuId/items/:itemId', async (req, res) => {
  const { menuId, itemId } = req.params;
  const { itemName, itemDesc, itemPrice } = req.body;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    const item = menu.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    item.itemName = itemName || item.itemName;
    item.itemDesc = itemDesc || item.itemDesc;
    item.itemPrice = itemPrice || item.itemPrice;
    await menu.save();
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
