const express = require('express');
const app = express();

const db = require('./models/db.js');
const path = require('path');
const cors = require('cors');
// const helmet = require('helmet');
const morgan = require('morgan');
// run with DEBUG=app:* yarn server
const debug = require('debug')('app:startup');

// for reading body of requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const whitelist = ['https://it-project-connected.herokuapp.com/', 'http://localhost:8080']
app.use(cors({
  origin: whitelist,
  // access-control-allow-credentials:true
  credentials: true, 
  optionSuccessStatus: 200
}))

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

// app.use(helmet());

app.get('/', (req, res) => {
  res.send('HOMEPAGE')
})

app.all('*', (req,res) => {
  res.status(404).send('Page not found')
})

// ROUTES


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`The SnacksInAVan app is listening on port ${port}...`)
})

module.exports = app