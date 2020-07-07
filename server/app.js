import express from 'express';
const app = express();


import morgan from 'morgan'
import cors from 'cors'
import path from 'path'


const history = require('connect-history-api-fallback');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(history());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public/')));

// app.get('/', (req, res) => {
//     res.send('Hola');
// });

app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), () => {
    console.log('Servirdor corriendo en el puerto ' + app.get('puerto'));
});

// npm install -g nodemon
// npm run dev
// npm i morgan --save
// npm i cors --save
// npm install --save connect-history-api-fallback
// npm install -D @babel/core @babel/cli @babel/preset-env @babel/node
// npm install mysql