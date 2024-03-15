const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const cors = require(`cors`)
const { ObjectId } = require("mongodb")


let MessageTopic = express.Router();
let app = express();
app.use(cors());
app.use(express.json());
let db;


connectToDb((err) => {
    if (!err) {
        app.listen(() => {
            console.log('app on port 5000(messages data)')
        })
        db = getDb();
    }
})


MessageTopic.get('/', (req, res) => {

    let messages = []

    db.collection('messages')
        .find()
        .sort({ NameUser: 1 })
        .forEach(message => messages.push(message))
        .then(() => {
            res.status(200).json(messages)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




MessageTopic.get('/:idTopic', (req, res) => {

    let messages = []

    db.collection('messages')
        .find({ idTopicMessage: (req.params.idTopic) })
        .forEach(message => messages.push(message))
        .then(doc => {
            res.status(200).json(messages)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



MessageTopic.get('/PublishBy/:id', (req, res) => {

    let messages = []

    db.collection('messages')
        .find({ Publish_by: (req.params.id) })
        .sort({ DatePublished: -1 })
        .forEach(message => messages.push(message))
        .then(doc => {
            res.status(200).json(messages)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



MessageTopic.delete('/deleteAllCommentsUser/:id', (req, res) => {

    db.collection('messages')
        .deleteMany({ Publish_by: (req.params.id) })

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })

})



MessageTopic.delete('/deleteCommentsTopic/:id', (req, res) => {

    db.collection('messages')
        .deleteMany({ idTopicMessage: (req.params.id) })

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




MessageTopic.delete('/deleteComment/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('messages')
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



// add new Message
MessageTopic.post('/NewMessage', (req, res) => {

    const message = req.body

    db.collection('messages')

        .insertOne(message)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})


module.exports = MessageTopic;