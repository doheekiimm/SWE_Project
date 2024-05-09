const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const TicketTypePrices = require('../../models/TicketTypePrices')

router.get('/', (req, res) => {
    TicketTypePrices.find().
    then((tickettypeprices) => res.json(tickettypeprices))
    .catch((err) => res.status(404).json({noitemsfound: "No tickettypeprices found."}))

})

router.get('/:id', (req, res) => {
    TicketTypePrices.findById(req.params.id).
    then((tickettypeprices) => res.json(tickettypeprices))
    .catch((err) => res.status(404).json({noitemsfound: "No tickettypeprices found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    TicketTypePrices.create(req.body)
        .then((tickettypeprices) => res.json({msg: 'Tickettypeprices added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this tickettypeprices'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    TicketTypePrices.findByIdAndUpdate(req.params.id, req.body)
        .then((tickettypeprices) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    TicketTypePrices.findByIdAndDelete(req.params.id)
        .then((tickettypeprices) => res.json({msg: 'Tickettypeprices entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such tickettypeprices'}))
})

module.exports = router; 