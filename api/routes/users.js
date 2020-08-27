const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/users');

router.get('/', checkAuth, UserController.get_all_users);

router.post('/signup', UserController.create_user);

router.get('/:userId', checkAuth, UserController.get_user_detail);

router.patch('/:userId', checkAuth, UserController.update_user);

router.post('/login', UserController.login_user)

router.delete('/:userId', checkAuth, UserController.delete_user);

module.exports = router;

