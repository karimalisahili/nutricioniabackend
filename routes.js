const express = require('express');
const router = express.Router();
const { loginUser, registerUser, deleteUser, updateUser } = require('./controllers/user');
const { getFoodsByUserEmail, createFood } = require('./controllers/food');

// Rutas para usuarios
router.post('/login', loginUser);
router.post('/register', registerUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);


// Rutas para alimentos
router.get('/foods/:email', getFoodsByUserEmail);
router.post('/foods', createFood);

module.exports = router;