import express from 'express';
const app = express();

import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import config from './configs/config'


const history = require('connect-history-api-fallback');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/')));

// app.get('/', (req, res) => {
//     res.send('Hola');
// });

app.set('puerto', process.env.PORT || 3000);
app.set('llave', config.llave);

app.use('/api', require('./routes/index'));

app.use(history());

app.listen(app.get('puerto'), () => {
    console.log('Servirdor corriendo en el puerto ' + app.get('puerto'));
});