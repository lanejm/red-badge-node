const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION 
      },
    },
  });

database.authenticate()
.then(() => console.log('postgres database is connected'))
.catch(err => console.log(err))


module.exports = database;
