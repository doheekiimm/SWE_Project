const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const USRating = require('../../models/USRating')

router.get('/', (req, res) => {
    USRating.find().
    then((usrating) => res.json(usrating))
    .catch((err) => res.status(404).json({noitemsfound: "No usratings found."}))

})

router.get('/:id', (req, res) => {
    USRating.findById(req.params.id).
    then((auditorium) => res.json(auditorium))
    .catch((err) => res.status(404).json({noitemsfound: "No usrating found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    USRating.create(req.body)
        .then((usrating) => res.json({msg: 'Usrating added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this usrating'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    USRating.findByIdAndUpdate(req.params.id, req.body)
        .then((usrating) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    USRating.findByIdAndDelete(req.params.id)
        .then((usrating) => res.json({msg: 'Usrating entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such usrating'}))
})

module.exports = router; 