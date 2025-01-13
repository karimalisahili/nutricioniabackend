const pool = require('../db');

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

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    await pool.query(
      'UPDATE USERS SET Name = $1, Email = $2, Password = $3 WHERE user_id = $4',
      [name, email, password, id]
    );
    res.status(200).send('User updated successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  loginUser,
  registerUser,
  deleteUser,
  updateUser
};