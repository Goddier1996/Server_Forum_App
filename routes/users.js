const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const cors = require(`cors`)
const { ObjectId } = require("mongodb")


let user = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;





connectToDb((err) => {
    if (!err) {
        app.listen(() => {
            console.log('app on port 5000(users data)')
        })
        db = getDb();
    }
})






user.get('/', (req, res) => {

    let users = []

    db.collection('users')
        .find()
        .sort({ Name: 1 })
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// count all users
user.get('/countAllUsers', (req, res) => {

    let users = []

    db.collection('users')
        .find()
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users.length)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})





user.get('/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .findOne({ _id: ObjectId(req.params.id) })

            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }

})




// user forget password
user.get('/forgetPassword/:Email', (req, res) => {


    db.collection('users')
        .findOne({ Email: req.params.Email })

        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })

})





// find login for register if have this login , user cant register
user.get('/FindLogin/:Login', (req, res) => {


    db.collection('users')
        .findOne({ Login: req.params.Login })

        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })

})





// here delete user id
user.delete('/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .deleteOne({ _id: ObjectId(req.params.id) })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})





// connect login user or doctor,admin
user.post('/login', (req, res) => {


    let Login = req.body.Login
    let Password = req.body.Password


    db.collection('users')
        .findOne({ Login: Login, Password: Password })

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })


})




// if user forget oassword , connect with email to change password
user.post('/Forget', (req, res) => {


    let Email = req.body.Email


    db.collection('users')
        .findOne({ Email: Email })

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })


})




// add new users
user.post('/Register', (req, res) => {

    const user = req.body

    db.collection('users')

        .insertOne(user)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})





// updates user data
user.patch('/:id', (req, res) => {

    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})



module.exports = user;