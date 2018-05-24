const router = require('express').Router();
const { Student } = require('../db');

router.get('/', async(req, res, next) => {
  try {
    const students = await Student.findAll({
      include: [{all: true, nested: true}]
    })
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

router.post('/addStudent', async(req, res, next) => {
  try {
    const newStudent = await Student.create(req.body)
    res.json(newStudent)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async(req, res, next) => {
  try {
    const updatedStudent = await Student.findOne({
      where: {
        id: req.params.id
      }
    }).update(req.body)
    res.json(updatedStudent)
  } catch (err) {
    next(err)
  }
})

//need await below?
router.delete('/:id', async(req, res, next) => {
  try {
    Student.destroy({
      where: {
        id: req.params.studentId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
