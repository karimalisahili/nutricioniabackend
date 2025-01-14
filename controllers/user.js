const pool = require('../db');

// Get User by Email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query('SELECT * FROM USERS WHERE Email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM USERS WHERE Email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    const user = result.rows[0];
    if (password !== user.password) {
      return res.status(401).send('Invalid credentials');
    }
    res.status(200).send('Login successful');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO USERS (Name, Email, Password, KcalxDay, FatxDay, ProteinxDay) VALUES ($1, $2, $3, 0, 0, 0)',
      [name, email, password]
    );
    res.status(200).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM USERS WHERE user_id = $1', [id]);
    res.status(200).send('User deleted successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update User by Email
const updateUser = async (req, res) => {
  const { email } = req.params;
  const { name, password, kcalxDay, fatxDay, proteinxDay } = req.body;
  try {
    await pool.query(
      'UPDATE USERS SET Name = $1, Password = $2, KcalxDay = $3, FatxDay = $4, ProteinxDay = $5 WHERE Email = $6',
      [name, password, kcalxDay, fatxDay, proteinxDay, email]
    );
    res.status(200).send('User updated successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};


module.exports = {
  getUserByEmail,
  loginUser,
  registerUser,
  deleteUser,
  updateUser
};