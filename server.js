var express = require('express');
var app = express();
var dbConnect = require('./connections/dbConnect.js')

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {

  dbConnect.query('SELECT * FROM public.holidays;', (err, results) => {
    // var pulldown = []
    if (err) throw err;
    // for (var i = 0; i < results.rows.length; i++) {
    //   console.log(JSON.stringify(results.rows[i].month))
    //   pulldown.push(JSON.stringify(results.rows[i].month) + " - " + JSON.stringify(results.rows[i].day))
    // }
    app.set('pulldown', results.rows);
    // ejs render automatically looks in the views folder
    res.render('index', {
      pulldown: results.rows
    });
    // }
  });

});

app.get('/photo', function (req, res) {
  // ejs render automatically looks in the views folder
  res.render('photogallery');
});

app.get('/game', function (req, res) {
  dbConnect.query('SELECT id, name, game_words FROM public.holidays;', (err, results) => {
    if (err) throw err;
    app.set('gametime', results.rows);
    res.render('game', {
      gametime: results.rows
    });
  });
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
  // console.log(process.env.DATABASE_URL);
});
