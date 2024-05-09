const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const Ticket = require('../../models/Ticket')

router.get('/', (req, res) => {
    Ticket.find().
    then((ticket) => res.json(ticket))
    .catch((err) => res.status(404).json({noitemsfound: "No tickets found."}))

})

router.get('/:id', (req, res) => {
    Ticket.findById(req.params.id).
    then((ticket) => res.json(ticket))
    .catch((err) => res.status(404).json({noitemsfound: "No ticket found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    Ticket.create(req.body)
        .then((ticket) => res.json({msg: 'Ticket added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this ticket'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    Ticket.findByIdAndUpdate(req.params.id, req.body)
        .then((ticket) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
        .then((ticket) => res.json({msg: 'Ticket entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such ticket'}))
})

module.exports = router; 