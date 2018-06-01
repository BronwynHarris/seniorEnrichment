const router = require('express').Router();
const { Student } = require('../db');

router.get('/', async(req, res, next) => {
  try {
    const students = await Student.findAll()
    res.json(students)
  } catch (err){
    next(err)
  }
})

router.get('/:id', async(req, res, next) => {
  Student.findById(req.params.id)
  .then(student => res.send(student))
  .catch(next)
})

router.post('/', async(req, res, next) => {
  try {
    const newStudent = await Student.create(req.body)
    res.json(newStudent)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next);
});

//need await below?
router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router
