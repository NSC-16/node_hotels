//working code error was not using express.json()

const express = require('express');
const os = require('node:os');
const app = express();
const db = require('./db');
const Menu = require('./models/Menu');
// const db1 = require('./db1');

const Person = require('./models/Person');

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Welcome to the MongoDB server');
});

app.post('/person', async (req, res) => {
  try {
      const { name, mobile, email, role } = req.body;

      // Create and save a new person document
      const person = new Person({ name, mobile, email, role });
      await person.save();

      // Send a success response
      res.status(201).json({ message: "Person saved successfully!", person });
  } catch (error) {
      console.error("Error saving person:", error);

      // Send an error response
      res.status(400).json({ message: "Failed to save person", error: error.message });
  }
});

app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("fetched");
    res.status(200).json(data);
  }catch(err){
    console.error("Error:", error);

    // Send an error response
    res.status(400).json({ message: "Failed to save person", error: error.message });

  }})

//Menu CRUD operations

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

// Route to add a new menu item
app.post('/menu', async (req, res) => {
  try {
    const { itemName, price, description, category, available } = req.body;

    // Create and save a new menu item
    const menuItem = new Menu({ itemName, price, description, category, available });
    await menuItem.save();

    res.status(201).json({ message: 'Menu item added successfully', menuItem });
  } catch (error) {
    res.status(400).json({ message: 'Error adding menu item', error: error.message });
  }
});

// Route to get a single menu item by ID
app.get('/menu/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu item', error: error.message });
  }
});

// Route to update a menu item by ID
app.put('/menu/:id', async (req, res) => {
  try {
    const { itemName, price, description, category, available } = req.body;
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { itemName, price, description, category, available },
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item updated successfully', menuItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu item', error: error.message });
  }
});

// Route to delete a menu item by ID
app.delete('/menu/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
})
