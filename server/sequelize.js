const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:')

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'F:\SQLite'
// });
async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();

module.exports = sequelize;
