const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('student',
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { isEmail: true}
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        campusId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
)

module.exports = Student
