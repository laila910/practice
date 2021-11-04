//routes
const userController = require('../controllers/user.controller')
const router = require('express').Router()
router.get('', userController.showUsers)
router.get('/addUser', userController.addUser)
router.post('/addUser', userController.saveData)
router.get('/single/:id', userController.singleUser)
router.get('/editUser/:id', userController.editData)
router.post('/editUser/:id', userController.editUser)
router.get('/delUser/:id', userController.deleteData)
router.get('*', userController.errPage)
module.exports = router