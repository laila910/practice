const fs = require('fs')
const readDataFromJson = () => {
    let users = []
    try {
        users = JSON.parse(fs.readFileSync('db/user.json').toString())
        if (!Array.isArray(users)) throw new Error()
    } catch (e) {
        users = []
    }
    return users
}
const writeData = (users) => {
    fs.writeFileSync('db/user.json', JSON.stringify(users))
}
const addUser = (req, res) => {
    // users = readDataFromJson()
    //     // res.send(req.query)
    // users.push(req.query)
    // writeData(users)
    res.render('add', {
        title: 'add user'
    })
}
const saveData = (req, res) => {
    users = readDataFromJson()
    user = {
        id: Date.now(),
        ...req.body
    }
    users.push(user)
    writeData(users)
    res.redirect('/')

}
const showUsers = (req, res) => {
    users = readDataFromJson()

    res.render('show', {
        title: "show users",
        data: users,
        isEmpty: users.length == 0 ? true : false
    })
}


const singleUser = (req, res) => {

    users = readDataFromJson()
    user = users.find(u => u.id == req.params.id)

    if (!user) {
        res.render('err404', {
            title: 'err 404',
            errmsg: 'user not found'
        })
    } else {
        res.render('single', {
            title: 'single user',
            data: user
        })
    }
}
const editData = (req, res) => {

    users = readDataFromJson()
    user = users.find(u => u.id == req.params.id)

    if (!user) {
        res.render('err404', {
            title: 'err 404',
            errmsg: 'user not found'
        })
    } else {
        res.render('edit', {
            title: 'edit user',
            data: user
        })
    }
}
const editUser = (req, res) => {
    users = readDataFromJson()
    userIndex = users.findIndex(ele => {
        return ele.id == req.params.id
    })
    users[userIndex].name = req.body.name
    users[userIndex].email = req.body.email
    users[userIndex].age = req.body.age
    users[userIndex].address = req.body.address
    writeData(users)
    res.redirect('/')
}
const deleteData = (req, res) => {
    users = readDataFromJson()
    userIndex = users.findIndex(EL => {
        return EL == req.params.id
    })
    if (!userIndex) {
        res.render('err404', {
            title: 'err 404',
            errmsg: 'user not found'
        })
    } else {
        users.splice(userIndex, 1)
        writeData(users)
        res.redirect('/')
    }
}
const errPage = (req, res) => {
    res.render('err404', {
        title: 'error page',
        errmsg: 'error found'
    })
}
module.exports = {
    showUsers,
    singleUser,
    editData,
    deleteData,

    addUser,
    saveData,
    editUser,
    errPage


}