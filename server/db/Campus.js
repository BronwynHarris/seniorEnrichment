const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campus',
    {
      name: {
            type: Sequelize.STRING,
            allowNull: false
      },
      image: {
            type: Sequelize.STRING,
            allowNull: false
      }
    }
)

module.exports = Campus
