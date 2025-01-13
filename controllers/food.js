const pool = require('../db');

// Get Foods by User Email
const getFoodsByUserEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email)
  try {
    const userResult = await pool.query('SELECT user_id FROM USERS WHERE Email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    const userId = userResult.rows[0].user_id;
    const foodsResult = await pool.query('SELECT * FROM CONSUMES WHERE user_id = $1', [userId]);
    res.status(200).json(foodsResult.rows);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Create Food
const createFood = async (req, res) => {
  const { email, foodName, dateTime, mass, kcal, fat, proteins } = req.body;
  try {
    const userResult = await pool.query('SELECT user_id FROM USERS WHERE Email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    const userId = userResult.rows[0].user_id;
    await pool.query(
      'INSERT INTO CONSUMES (user_id, FoodName, DateTime, Mass, Kcal, Fat, Proteins) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [userId, foodName, dateTime, mass, kcal, fat, proteins]
    );
    res.status(200).send('Food consumed successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getFoodsByUserEmail,
  createFood
};