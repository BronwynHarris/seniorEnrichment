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
            allowNull: false,
            defaultValue: 'https://www.universiteitleiden.nl/binaries/content/gallery/customsites/humanities-campus/letter-to-a-square.jpg/letter-to-a-square.jpg/d700xvar'
      }
    }
)

module.exports = Campus
