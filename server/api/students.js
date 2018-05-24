const router = require('express').Router();
const { Student } = require('../db/models');

router.get('/', async(req, res, next) => {
  try {
    const students = Student.findAll({
      include: [{all: true, nested: true}]
    })
    res.json(students)
  } catch (err){
    next(err)
  }
})

router.get(':/studentId', async(req, res, next) => {
  try {
    const student = Student.findOne({
      where: {
        id: req.params.studentId
      }
    })
    res.json(student)
  } catch (err){
    next(err)
  }
})

router.post('/addStudent', async(req, res, next) => {
  try {
    const newStudent = Student.create(req.body)
    res.json(newStudent)
  } catch (err) {
    next(err)
  }
})

router.put('/:studentId', (req, res, next) => {
  try {
    const updatedStudent = Student.findOne({
      where: {
        id: req.params.studentId
      }
    }).update(req.body)
    res.json(updatedStudent)
  } catch (err) {
    next(err)
  }
})

router.delete(':/studentId', async(req, res, next) => {
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
