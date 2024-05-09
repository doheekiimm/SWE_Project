const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const Showtimes = require('../../models/ShowTimes')

router.get('/', (req, res) => {
    Showtimes.find().
    then((showtimes) => res.json(showtimes))
    .catch((err) => res.status(404).json({noitemsfound: "No showtimes found."}))

})

router.get('/:id', (req, res) => {
    Showtimes.findById(req.params.id).
    then((showtimes) => res.json(showtimes))
    .catch((err) => res.status(404).json({noitemsfound: "No showtime found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    Showtimes.create(req.body)
        .then((showtimes) => res.json({msg: 'Showtime added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this showtime'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    Showtimes.findByIdAndUpdate(req.params.id, req.body)
        .then((showtimes) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Showtimes.findByIdAndDelete(req.params.id)
        .then((showtimes) => res.json({msg: 'showtime entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such showtime'}))
})

module.exports = router; 