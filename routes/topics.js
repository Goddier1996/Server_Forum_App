const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const cors = require(`cors`)
const { ObjectId } = require("mongodb")


let topic = express.Router();
let app = express();
app.use(cors());
app.use(express.json());
let db;


connectToDb((err) => {
    if (!err) {
        app.listen(() => {
            console.log('app on port 5000(topics data)')
        })
        db = getDb();
    }
})



topic.get('/', (req, res) => {

    let users = []

    db.collection('topics')
        .find()
        .sort({ NameUser: 1 })
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



topic.get('/:id', (req, res) => {

    let topics = []

    if (ObjectId.isValid(req.params.id)) {

        db.collection('topics')
            .find({ _id: ObjectId(req.params.id) })
            .forEach(topic => topics.push(topic))
            .then(doc => {
                res.status(200).json(topics)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }
    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }

})



topic.get('/CategoryTopic/:idCategory', (req, res) => {

    let topics = []

    db.collection('topics')
        .find({ codeCategory: (req.params.idCategory) })
        .sort({ DatePublished: -1 })
        .forEach(topic => topics.push(topic))
        .then(doc => {
            res.status(200).json(topics)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



topic.get('/PublishBy/:id', (req, res) => {

    let topics = []

    db.collection('topics')
        .find({ Publish_by: (req.params.id) })
        .sort({ DatePublished: -1 })
        .forEach(topic => topics.push(topic))
        .then(doc => {
            res.status(200).json(topics)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



topic.delete('/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('topics')
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



topic.delete('/deleteAllTopicsUser/:id', (req, res) => {

    db.collection('topics')
        .deleteMany({ Publish_by: (req.params.id) })

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



topic.post('/NewTopic', (req, res) => {

    const topic = req.body

    db.collection('topics')

        .insertOne(topic)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})


module.exports = topic;