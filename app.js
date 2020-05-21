var createError = require('http-errors');
var cookieParser = require('cookie-parser');

var express = require('express');
var path = require('path');
const exphbs = require('express-handlebars')

var app = express();

const PORT = process.env.PORT || 5000;

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// get all todos
app.get('/test', (req, res) => {
  res.status(200).send({
    success: 'true',
    data: 'this was a successful test!'
  })
});

app.get('/home', (request, response) => {
  response.render('home', {
    name: 'C. Pot... I\'ve been expecting you...'
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
});

module.exports = app;
