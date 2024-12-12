import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import backgroundImage from '../assets/images/img6.jpg';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [newMenu, setNewMenu] = useState({ menuName: '', menuDesc: '' });
  const [newItem, setNewItem] = useState({ itemName: '', itemDesc: '', itemPrice: '' });
  const [editMenu, setEditMenu] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);

  const apiBase = 'http://localhost:5000/api/menus';

  const fetchMenus = async () => {
    try {
      const response = await axios.get(apiBase);
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const createMenu = async () => {
    try {
      const response = await axios.post(apiBase, newMenu);
      setMenus([...menus, response.data]);
      setNewMenu({ menuName: '', menuDesc: '' });
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  const updateMenu = async () => {
    try {
      const response = await axios.put(`${apiBase}/${editMenu._id}`, editMenu);
      setMenus(menus.map((menu) => (menu._id === editMenu._id ? response.data : menu)));
      setEditMenu(null);
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const deleteMenu = async (menuId) => {
    try {
      await axios.delete(`${apiBase}/${menuId}`);
      setMenus(menus.filter((menu) => menu._id !== menuId));
      if (selectedMenu && selectedMenu._id === menuId) setSelectedMenu(null);
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const addItem = async () => {
    if (!selectedMenu) {
      alert('Please select a menu first.');
      return;
    }
    try {
      const response = await axios.post(`${apiBase}/${selectedMenu._id}/items`, newItem);
      const addedItem = response.data;
      setSelectedMenu((prevMenu) => ({
        ...prevMenu,
        items: [...prevMenu.items, addedItem],
      }));
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === selectedMenu._id
            ? { ...menu, items: [...menu.items, addedItem] }
            : menu
        )
      );
      setNewItem({ itemName: '', itemDesc: '', itemPrice: '' });
      setShowAddItem(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async () => {
    try {
      const response = await axios.put(
        `${apiBase}/${selectedMenu._id}/items/${editItem._id}`,
        editItem
      );
      const updatedItem = response.data;
      setSelectedMenu((prevMenu) => ({
        ...prevMenu,
        items: prevMenu.items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        ),
      }));
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === selectedMenu._id
            ? {
                ...menu,
                items: menu.items.map((item) =>
                  item._id === updatedItem._id ? updatedItem : item
                ),
              }
            : menu
        )
      );
      setEditItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${apiBase}/${selectedMenu._id}/items/${itemId}`);
      setSelectedMenu({
        ...selectedMenu,
        items: selectedMenu.items.filter((item) => item._id !== itemId),
      });
      setMenus(
        menus.map((menu) =>
          menu._id === selectedMenu._id
            ? {
                ...menu,
                items: menu.items.filter((item) => item._id !== itemId),
              }
            : menu
        )
      );
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-5 font-sans">
      <div
        className="mb-10 text-center p-10 rounded"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold uppercase">Menu Management</h1>
        </header>

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Create New Menu</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="text"
              placeholder="Menu Name"
              value={newMenu.menuName}
              onChange={(e) => setNewMenu({ ...newMenu, menuName: e.target.value })}
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="Menu Description"
              value={newMenu.menuDesc}
              onChange={(e) => setNewMenu({ ...newMenu, menuDesc: e.target.value })}
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
            <button
              onClick={createMenu}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Create Menu
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-center text-3xl font-bold mb-6">Menus</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {menus.map((menu) => (
            <div key={menu._id} className="flex flex-col md:flex-row gap-2 items-center">
              <button
                onClick={() => setSelectedMenu(menu)}
                className={`px-6 py-3 text-lg font-medium border-2 ${
                  selectedMenu && selectedMenu._id === menu._id
                    ? 'bg-blue-700 text-white border-blue-500'
                    : 'bg-black text-white border-gray-500 hover:border-gray-400'
                }`}
              >
                {menu.menuName}
              </button>
              <button
                onClick={() => setEditMenu(menu)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteMenu(menu._id)}
                className="text-red-400 hover:text-red-300"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {editMenu && (
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Edit Menu</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="text"
              placeholder="Menu Name"
              value={editMenu.menuName}
              onChange={(e) => setEditMenu({ ...editMenu, menuName: e.target.value })}
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="Menu Description"
              value={editMenu.menuDesc}
              onChange={(e) => setEditMenu({ ...editMenu, menuDesc: e.target.value })}
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
            <button
              onClick={updateMenu}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {selectedMenu && (
        <div className="border-4 border-white p-6 rounded-lg bg-black">
          <h2 className="text-center text-4xl font-extrabold mb-6 uppercase tracking-wide text-white">
            {selectedMenu.menuName}
          </h2>
          <p className="text-center text-lg mb-4 text-gray-300 italic">
            {selectedMenu.menuDesc}
          </p>
          <div className="border-t border-gray-500 pt-4">
            {selectedMenu.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center border-b border-gray-600 py-4 gap-4 hover:bg-gray-800 transition-all duration-300 rounded-md"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {item.itemName}
                  </h3>
                  <p className="text-sm text-gray-400 italic">{item.itemDesc}</p>
                </div>
                <div className="text-lg font-bold text-yellow-400">${item.itemPrice}</div>
                <button
                  onClick={() => setEditItem(item)}
                  className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-2xl"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-red-400 hover:text-red-300 transition-all duration-300 text-2xl"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            {editItem && (
              <div className="mt-6">
                <h3 className="text-3xl font-semibold mb-4 text-white">Edit Item</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={editItem.itemName}
                    onChange={(e) => setEditItem({ ...editItem, itemName: e.target.value })}
                    className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-auto"
                  />
                  <input
                    type="text"
                    placeholder="Item Description"
                    value={editItem.itemDesc}
                    onChange={(e) => setEditItem({ ...editItem, itemDesc: e.target.value })}
                    className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-auto"
                  />
                  <input
                    type="number"
                    placeholder="Item Price"
                    value={editItem.itemPrice}
                    onChange={(e) => setEditItem({ ...editItem, itemPrice: e.target.value })}
                    className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-auto"
                  />
                  <button
                    onClick={updateItem}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all duration-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

<button
  onClick={() => setShowAddItem((prev) => !prev)}
  className={`mt-4 ml-[650px] px-6 py-3 rounded-lg font-medium text-white  ${
    showAddItem
      ? 'bg-gray-200 text-blue-600 border-2 border-blue-600 hover:bg-gray-300'
      : 'bg-blue-600 border-2 border-blue-600 hover:bg-blue-700'
  }`}
>
  {showAddItem ? 'Cancel' : 'Add Item'}
</button>


            {showAddItem && (
              <div className="mt-6">
                <h3 className="text-3xl font-semibold mb-4 text-white">Add New Item</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.itemName}
                    onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                    className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                  />
                  <input
                    type="text"
                    placeholder="Item Description"
                    value={newItem.itemDesc}
                    onChange={(e) => setNewItem({ ...newItem, itemDesc: e.target.value })}
                    className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                  />
                  <input
                    type="number"
                    placeholder="Item Price"
                    value={newItem.itemPrice}    
                    onChange={(e) =>setNewItem({ ...newItem,itemPrice: e.target.value })}
                    className="p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                  />
                <button
  onClick={addItem}
  className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400"
>
  Add Item
</button>

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

