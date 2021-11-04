const dbCon = require('../models/dbconnection')
const ObjectId = require('mongodb').ObjectId
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

    let user = req.body
        //insert user
    dbCon((err, db) => {
        if (err) res.send(err)
        db.collection('user').insertOne(user, (error, result) => {
            if (error) res.send(error)
            res.redirect('/')
        })
    })

}
const showUsers = (req, res) => {

    dbCon((err, db) => {
        if (err) res.send(err)
        db.collection('user').find().toArray((err, users) => {
            if (err) res.send(err)
            res.render('show', {
                title: "show users",
                data: users,
                isEmpty: users.length == 0 ? true : false
            })
        })
    })

}


const singleUser = (req, res) => {
    dbCon((err, db) => {
        if (err) res.send(err)
        db.collection('user').findOne({ _id: new ObjectId(req.params.id) }, (error, user) => {
            if (error) res.send(error)
            res.render('single', {
                title: 'single user',
                data: user
            })

        })
    })

}
const editData = (req, res) => {
    dbCon((err, db) => {
        if (err) res.send(err)
        db.collection('user').findOne({ _id: new ObjectId(req.params.id) }, (error, user) => {
            if (error) res.send(error)
            res.render('edit', {
                title: 'edit user',
                data: user
            })

        })
    })


}
const editUser = (req, res) => {
    dbCon((error, db) => {
        if (error) res.send(error)
        db.collection('user').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            .then(() => res.redirect('/'))
            .catch((e) => res.send(e))
    })

}
const deleteData = (req, res) => {
    dbCon((error, db) => {
        if (error) res.send(error)
        db.collection('user').deleteOne({ _id: new ObjectId(req.params.id) })
            .then(() => res.redirect('/'))
            .catch(e => res.send(e))
    })

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