const express = require('express');
const router = express.Router();
const { loginUser, registerUser, deleteUser, updateUser, getUserByEmail } = require('./controllers/user');
const { getFoodsByUserEmail, createFood } = require('./controllers/food');

// Rutas para usuarios
router.get('/user/:email', getUserByEmail);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:email', updateUser);


// Rutas para alimentos
router.get('/foods/:email', getFoodsByUserEmail);
router.post('/foods', createFood);

module.exports = router;