const express = require('express');
const cors = require('cors');
const userController = require('./src/controllers/userController.js');

const app = express();
const port = 5001;

app.use(cors());

app.get('/', (req, res) => res.send('Privacy Doc Server'));

app.delete('/user/:id', userController.deleteUserData);

app.get('/user/privacy/:id', userController.getUserData);

app.listen(port, () => console.log(`App listening on port ${port}!`));