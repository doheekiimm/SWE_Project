const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const bcryptjs = require('bcryptjs');
const PaymentCard = require('../../models/PaymentCard');
router.get('/', (req, res) => {
    PaymentCard.find().
    then((paymentcard) => res.json(paymentcard))
    .catch((err) => res.status(404).json({noitemsfound: "No paymentcard found."}))

})

router.get('/:id', (req, res) => {
    PaymentCard.findById(req.params.id).
    then((paymentcard) => res.json(paymentcard))
    .catch((err) => res.status(404).json({noitemsfound: "No paymentcard found."}))
})
// add card
router.post('/', bodyParser.json(), async (req, res) => {
    try{
        const {cardNumber, name, userID, address, expirationDate} = req.body;
        const existingCard = await PaymentCard.findOne({cardNumber})
        if (existingCard){
            return res
            .status(400)
            .json({msg:"card already in use"})
        };
        if (cardNumber.length !== 16 || /[a-zA-Z]/.test(cardNumber)) {
            return res
            .status(400)
            .json({msg: "Invalid card number"})
        }
        const hashedCardNumber = await bcryptjs.hash(cardNumber, 16);
        const newCard = new PaymentCard({
            cardNumber: hashedCardNumber,
            name,
            address,
            userID,
            expirationDate
        });

        const savedCard = await newCard.save();
        console.log(savedCard);
        res.json(savedCard);
    } catch (err) {
        res.status(500).json({error: err.message});
    }

});
    
    /*
    PaymentCard.create(req.body)
        .then((paymentcard) => res.json({msg: 'Paymentcard added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this paymentcard', err}))
    */



router.put('/:id', bodyParser.json(), (req, res) => {
  
    PaymentCard.findByIdAndUpdate(req.params.id, req.body)
        .then((paymentcard) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    PaymentCard.findByIdAndDelete(req.params.id)
        .then((paymentcard) => res.json({msg: 'Paymentcard entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such paymentcard'}))
})

module.exports = router; 