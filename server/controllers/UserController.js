const User = require('../models/user');
async function createUser(req, res) {
    try {
      // Extract user data from the request body
      const { username, email, phone, password, profile_type } = req.body;
      
      // Create a new user using the User model
      const user = await User.create({ username, email, phone, password, profile_type });
      
      // Return the created user in the response
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  }
  
  

  // Delete a user by ID
  async function deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      await user.destroy();
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user.' });
    }
  }
  
  // Update a user by ID
  async function updateUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Update the user attributes based on the request body
      user.username = req.body.username;
      user.email = req.body.email;
      // Update other attributes as needed
  
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user.' });
    }
  }
  
  // Get a user by ID
  async function getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user.' });
    }
  }
  
  module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
  };
    
  