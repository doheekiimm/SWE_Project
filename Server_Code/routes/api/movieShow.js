const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

const MovieShow = require('../../models/MovieShow');
const Auditorium = require('../../models/Auditorium');

router.get('/', (req, res) => {
    MovieShow.find().
    then((movieshow) => res.json(movieshow))
    .catch((err) => res.status(404).json({noitemsfound: "No movieshows found."}))

})

router.get('/:id', (req, res) => {
    MovieShow.findById(req.params.id).
    then((movieshow) => res.json(movieshow))
    .catch((err) => res.status(404).json({noitemsfound: "No movieshow found."}))
})

/*router.post('/', bodyParser.json(), (req, res) => {
    MovieShow.create(req.body)
        .then((movieshow) => res.json({msg: 'Movieshow added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this movieshow'}))
})*/

router.post('/', bodyParser.json(), async (req, res) => { 
    console.log('-----------------------------start of test---------------------------------')
    console.log(req.body)
    const { movieID, auditoriumID, showTimeID}  = req.body;
    console.log('MovieID  '+movieID);
    console.log('AuditoriumID  '+auditoriumID);
    console.log('TimeID  '+showTimeID);
    try {
        // gettig auditorium name//
        const audi =await Auditorium.findById(auditoriumID)
        const audiName = audi.auditoriumName;
        console.log(audiName)
        ///////////////////////////
        console.log('Checking for exsiting movieshow')
        const existingAuditorium = await Auditorium.findOne({auditoriumName:audiName})
        console.log('result of existingAuditorium  '+existingAuditorium)
        const existingMovieShow= await MovieShow.findOne({showTimeID});
        console.log('result of existingMoiveShow  '+existingMovieShow);
        if (existingMovieShow!= null&&existingAuditorium!= null) {
            return res.status(400).json({ message: 'MovieShow already exists' });
        }       
        console.log(req.body);
        console.log('creating movieshow')
        const newMovieShow =MovieShow.create(req.body)
        console.log('-----------------------------End of test---------------------------------')
        res.status(201).json({ message: 'MovieShow added successfully', newMovieShow });
    }catch (err){ 
        res.status(400).json({ error: 'Unable to add this movieshow'})
    }
})

router.put('/:id', bodyParser.json(), (req, res) => {
    MovieShow.findByIdAndUpdate(req.params.id, req.body)
        .then((movieshow) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    MovieShow.findByIdAndDelete(req.params.id)
        .then((movieshow) => res.json({msg: 'Movieshow entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such movieshow'}))
})

module.exports = router; 