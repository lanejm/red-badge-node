const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})

const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

database.authenticate()
.then(() => console.log('postgres database is connected'))
.catch(err => console.log(err))


module.exports = database;

//db association? 