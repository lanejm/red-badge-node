require ('dotenv').config()
const Express = require('express')
const app = Express();
const database = require('./db');

database.sync();

app.use(Express.json());

app.use(require('./middleware/headers'));

const giftsController = require('./controllers/giftscontroller');
app.use('/gifts', giftsController);

const holidaysController = require('./controllers/holidayscontroller');
app.use('/holidays', holidaysController);

const userController = require('./controllers/usercontroller');
app.use('/user', userController);

app.listen(process.env.PORT, function() { console.log(`app is listening on port ${process.env.PORT}`) });