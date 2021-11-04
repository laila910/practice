const router = require('express').Router()
const upload = require('../middleware/profileImgUpload')
const userController = require('../controller/user.controller')


const auth = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/addMobileNo/:id', userController.addMobileNo)
router.post('/login', userController.login)
router.get('/profile', auth, userController.profile)
router.get('/logOut', auth, userController.logOut)
router.get('/logOutAll', auth, userController.logOutAll)
router.post('/addProfileImage', auth, upload.single('profileImage'), userController.addProfileImage)
module.exports = router