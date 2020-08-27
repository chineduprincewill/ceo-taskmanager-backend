const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TaskController = require('../controllers/tasks');

router.get('/', checkAuth, TaskController.get_all_tasks);

router.post('/', checkAuth, TaskController.create_task);

router.get('/:taskId', checkAuth, TaskController.get_task_detail);

router.patch('/:taskId', checkAuth, TaskController.update_task);

router.delete('/:taskId', checkAuth, TaskController.delete_task);

module.exports = router;

