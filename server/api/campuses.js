const router = require("express").Router();
const { Campus } = require("../db/models");

router.get('/', async (req, res, next) => {
  try {
    const campuses = Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = Campus.findById({
      where: {
        id: req.params.campusId
      }
    });
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

router.post('/addCampus', async (req, res, next) => {
  try {
    const newCampus = Campus.create(req.body);
    res.status(201).json(newCampus);
  } catch (err) {
    next(err);
  }
});

router.put('/:campusId', async (req, res, next) => {
  try {
    const updatedCampus = Campus.findOne({
      where: {
        id: req.params.id
      }
    }).update(req.body);
    res.json(updatedCampus);
  } catch (err) {
    next(err);
  }
});

router.delete('/:campusId', async (req, res, next) => {
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
