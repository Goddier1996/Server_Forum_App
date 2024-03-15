const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const cors = require(`cors`)
const { ObjectId } = require("mongodb")


let category = express.Router();


let app = express();
app.use(cors());
app.use(express.json());
let db;



connectToDb((err) => {
    if (!err) {
        app.listen(() => {
            console.log('app on port 5000(category data)')
        })
        db = getDb();
    }
})



category.get('/', (req, res) => {

    let categorys = []

    db.collection('category')
        .find()
        .sort({ title: 1 })
        .forEach(category1 => categorys.push(category1))
        .then(() => {
            res.status(200).json(categorys)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



category.post('/add', (req, res) => {

    const category = req.body

    db.collection('category')

        .insertOne(category)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



// here delete category id
category.delete('/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {

        db.collection('category')
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



module.exports = category;