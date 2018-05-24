const router = require("express").Router();
const { Campus } = require("../db");

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
  .then(campus => res.send(campus))
  .catch(next)
});

router.post('/addCampus', async (req, res, next) => {
  try {
    const newCampus = await Campus.create(req.body);
    res.status(201).json(newCampus);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCampus = await Campus.findOne({
      where: {
        id: req.params.id
      }
    }).update(req.body);
    res.json(updatedCampus);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.campusId
      }
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
