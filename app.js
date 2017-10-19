const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const gumRouter = require('./controllers/gum-controllers.js')

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/gums', gumRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({error: err});
})

app.use((req, res) => {
  res.status(404).json({error: {status: 404, message: 'Not Found.'}});
})

const listener = () => console.log(`Listening on port ${port}!`);
app.listen(port, listener);
