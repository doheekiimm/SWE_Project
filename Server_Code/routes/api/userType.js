const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const UserType = require('../../models/UserType')
const bycrypt = require('bcryptjs')


router.get('/', (req, res) => {
    UserType.find().
    then((usertype) => res.json(usertype))
    .catch((err) => res.status(404).json({noitemsfound: "No usertype found."}))

})

router.get('/:id', (req, res) => {
    UserType.findById(req.params.id).
    then((usertype) => res.json(usertype))
    .catch((err) => res.status(404).json({noitemsfound: "No usertype found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    UserType.create(req.body)
        .then((usertype) => res.json({msg: 'Usertype added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this usertype'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    UserType.findByIdAndUpdate(req.params.id, req.body)
        .then((usertype) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    UserType.findByIdAndDelete(req.params.id)
        .then((usertype) => res.json({msg: 'Usertype entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such usertype'}))
})

module.exports = router; 