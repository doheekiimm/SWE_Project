const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const Seat = require('../../models/Seat');
const Auditorium = require('../../models/Auditorium');

router.get('/', (req, res) => {
    Auditorium.find().
    then((auditorium) => res.json(auditorium))
    .catch((err) => res.status(404).json({noitemsfound: "No auditoriums found."}))

})

router.get('/:id', (req, res) => {
    Auditorium.findById(req.params.id).
    then((auditorium) => res.json(auditorium))
    .catch((err) => res.status(404).json({noitemsfound: "No auditorium found."}))
})

router.post('/', bodyParser.json(), (req, res) => {
    Auditorium.create(req.body)
        .then((auditorium) => {
            // Extract necessary information from the request body
            const { numberOfSeats, seatRow, seatColumn } = req.body;
            const seats = [];

            // Create seat objects based on the number of rows and columns
            for (let row = 1; row <= seatRow; row++) {
                for (let column = 1; column <= seatColumn; column++) {
                    seats.push({
                        auditoriumID: auditorium._id,
                        isTaken: false,
                        seatRow: row,
                        seatColumn: column
                    });
                }
            }

            // Insert all seat objects into the database
            return Seat.insertMany(seats)
                .then(() => res.json({ auditorium, msg: 'Auditorium and corresponding seats added successfully.' }))
                .catch(() => {
                    // If there's an error in inserting seats, remove the created auditorium
                    Auditorium.deleteOne({ _id: auditorium._id })
                        .then(() => res.status(400).json({ error: 'Unable to add auditorium and seats.' }))
                        .catch(() => res.status(500).json({ error: 'Internal server error.' }));
                });
        })
        .catch((err) => res.status(400).json({ error: 'Unable to add this auditorium.' }));
});

router.put('/:id', bodyParser.json(), (req, res) => {
    Auditorium.findByIdAndUpdate(req.params.id, req.body)
        .then((auditorium) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Auditorium.findByIdAndDelete(req.params.id)
        .then((auditorium) => res.json({msg: 'Auditorium entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such auditorium'}))
})

module.exports = router; 

//all auditorium routes now in DB