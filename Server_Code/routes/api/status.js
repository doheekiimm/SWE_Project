const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const Status = require('../../models/Status')

router.get('/', (req, res) => {
    Status.find().
    then((userstatus) => res.json(userstatus))
    .catch((err) => res.status(404).json({noitemsfound: "No status found."}))

})

router.get('/:id', (req, res) => {
    Status.findById(req.params.id).
    then((userstatus) => res.json(userstatus))
    .catch((err) => res.status(404).json({noitemsfound: "No status found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    Status.create(req.body)
        .then((userstatus) => res.json({msg: 'Status added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this status'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    Status.findByIdAndUpdate(req.params.id, req.body)
        .then((userstatus) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Status.findByIdAndDelete(req.params.id)
        .then((userstatus) => res.json({msg: 'Status entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such status'}))
})

module.exports = router; 