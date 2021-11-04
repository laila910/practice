const User = require('../models/user.model')
const sendEmaily = require('../helper/sendEmail.helper')
const register = async(req, res) => {
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
const addMobileNo = async(req, res) => {
    try {
        let userData = await User.findById(req.params.id)
        mobileNo = req.body
        userData.mobileNo.push(mobileNo)
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
const login = async(req, res) => {
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
const profile = async(req, res) => {
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
const logOut = async(req, res) => {
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
const logOutAll = async(req, res) => {
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
const addProfileImage = async(req, res) => {
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
module.exports = { register, addMobileNo, login, profile, logOut, logOutAll, addProfileImage }