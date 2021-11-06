const router = require('express').Router()
const upload = require('../middleware/profileImgUpload')
const userController = require('../controller/user.controller')


const auth = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/addMobileNo', auth, userController.addMobileNo)
router.post('/login', userController.login)
router.get('/profile', auth, userController.profile)
router.get('/logOut', auth, userController.logOut)
router.get('/logOutAll', auth, userController.logOutAll)
router.post('/addProfileImage', auth, upload.single('profileImage'), userController.addProfileImage)
router.patch('/editUser', auth, userController.editUser)
router.post('/sendReq/:id', auth, userController.sendFriendRequest)
router.post('/removeReq/:id', auth, userController.removeReq)
module.exports = router