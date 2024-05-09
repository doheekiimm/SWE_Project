const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const Seat = require('../../models/Seat')

router.get('/', (req, res) => {
    Seat.find().
    then((seat) => res.json(seat))
    .catch((err) => res.status(404).json({noitemsfound: "No seats found."}))

})

router.get('/:id', (req, res) => {
    Seat.findById(req.params.id).
    then((seat) => res.json(seat))
    .catch((err) => res.status(404).json({noitemsfound: "No seat found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    Seat.create(req.body)
        .then((seat) => res.json({msg: 'Seat added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this seat'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    Seat.findByIdAndUpdate(req.params.id, req.body)
        .then((seat) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Seat.findByIdAndDelete(req.params.id)
        .then((seat) => res.json({msg: 'Seat entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such seat'}))
})

module.exports = router; 