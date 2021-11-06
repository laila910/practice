const User = require('../models/user.model')
const sendEmaily = require('../helper/sendEmail.helper')
class UserController {
    static async register(req, res) {
        try {
            const userData = new User(req.body)
            await userData.save()
            sendEmaily(userData.email, 'welcome to our site ')
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message: "register sucess :)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "user not saved"
            })
        }
    }
    static async addMobileNo(req, res) {
        try {
            let userData = await User.findById(req.user._id)
            let No = req.body
            userData.mobileNo.push(No)
            await userData.save()
            res.status(200).send({
                apiStatus: true,
                data: userData,
                message: "mobile number is added"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "user number not added :("
            })
        }
    }
    static async login(req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            token = await user.generateToken()

            res.status(200).send({
                apiStatus: true,
                data: { user, token },
                message: "login sucess:)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "login invalid"
            })
        }

    }
    static async profile(req, res) {
        try {
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: 'profile successed'
            })

        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in retriving data information:("
            })
        }

    }
    static async logOut(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter(singleToken => {
                return singleToken.token != req.token

            })
            res.status(200).send({
                apiStatus: true,
                data: "",
                message: "you logout from these device :)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "logout unavailable ,please try again"
            })
        }
    }
    static async logOutAll(req, res) {
        try {
            req.user.tokens = []
            res.status(200).send({
                apiStatus: true,
                data: "",
                message: "you logout from these device :)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "logout unavailable ,please try again"
            })
        }
    }
    static async addProfileImage(req, res) {
        try {
            req.user.profileImage = req.file.path.replace('\\', '/')
            await req.user.save()

            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "uploaded successfully :)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error,please try again"
            })
        }
    }
    static async editUser(req, res) {
        try {
            let user = await User.findById(req.user._id)
            for (let d in req.body) {
                user[d] = req.body[d]
            }
            // const updatedData = await User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true })
            // if (!updatedData) res.send('User not found')
            // req.user = updatedData
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "edit successfully :)"
            })

        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error,please try again"
            })
        }
    }
    static async sendFriendRequest(req, res) {
        try {
            let userReceive = await User.findById(req.params.id)
            let usersend = await User.findById(req.user._id)
            userReceive.friendRequests.push(req.user._id)
            usersend.RequestsSent.push(req.params.id)
            await userReceive.save()
            await usersend.save()
            res.status(200).send({
                apiStatus: true,
                data: 'request sent',
                message: "requset send successfully :)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error,please try again"
            })
        }
    }
    static async removeReq(req, res) {
        try {

            let userData = await User.findById(req.user._id)
                // containReqs = userData.friendsRequests
                // let UserToRemove = await containReqs.findById(req.params.id)


            // userToRemove = (userData.friendsRequests).filter(req => {
            //     return (userData.friendsRequests).contain(req.params.id) = "" == req
            // })
            // console.log(UserToRemove)
            res.status(200).send({
                apiStatus: true,
                data: 'request removed',
                message: "requset send successfully :)"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error,please try again"
            })
        }
    }
}
module.exports = UserController