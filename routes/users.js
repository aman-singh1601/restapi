const express = require('express');

const {getAllUsers, patchUser, deleteUser, createUser, getUserById} = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

module.exports = router;

